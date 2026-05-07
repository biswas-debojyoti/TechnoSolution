const Client = require("../models/Client");
const { sendSuccess, sendError, sendPaginated } = require("../utils/apiResponse");

/**
 * @desc    Get all clients with filters
 * @route   GET /api/clients
 * @access  Private
 */
const getAllClients = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const { search, status, service, assignedTo } = req.query;
    const startIndex = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;
    if (service) filter.services = { $in: [service] };
    if (assignedTo) filter.assignedTo = assignedTo;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Client.countDocuments(filter);
    const clients = await Client.find(filter)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate("assignedTo", "name")
      .lean();

    return sendPaginated(res, clients, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    }, "Clients fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get client by ID
 * @route   GET /api/clients/:id
 * @access  Private
 */
const getClientById = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id).populate("assignedTo", "name");
    if (!client) return sendError(res, "Client not found", 404);
    return sendSuccess(res, { client }, "Client fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update client details
 * @route   PUT /api/clients/:id
 * @access  Private
 */
const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!client) return sendError(res, "Client not found", 404);
    return sendSuccess(res, { client }, "Client updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete client
 * @route   DELETE /api/clients/:id
 * @access  Private
 */
const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return sendError(res, "Client not found", 404);
    return sendSuccess(res, null, "Client deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add payment to client
 * @route   POST /api/clients/:id/payments
 * @access  Private
 */
const addPayment = async (req, res, next) => {
  try {
    const { amount, date, method, reference, notes } = req.body;
    const client = await Client.findById(req.params.id);
    if (!client) return sendError(res, "Client not found", 404);

    client.payments.push({ amount, date, method, reference, notes });
    await client.save();

    return sendSuccess(res, { client }, "Payment added successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete payment from client
 * @route   DELETE /api/clients/:id/payments/:paymentId
 * @access  Private
 */
const deletePayment = async (req, res, next) => {
  try {
    const { id, paymentId } = req.params;
    const client = await Client.findById(id);
    if (!client) return sendError(res, "Client not found", 404);

    client.payments = client.payments.filter(p => p._id.toString() !== paymentId);
    await client.save();

    return sendSuccess(res, { client }, "Payment removed successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  addPayment,
  deletePayment,
};
