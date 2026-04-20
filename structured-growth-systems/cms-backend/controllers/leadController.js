const Lead = require("../models/Lead");
const Client = require("../models/Client");
const { sendSuccess, sendError, sendPaginated } = require("../utils/apiResponse");

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Private
 */
const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, source, status, budget, notes, assignedTo, services } = req.body;

    const newLead = new Lead({
      name,
      email,
      phone,
      source,
      status,
      budget,
      notes,
      assignedTo,
      services,
    });

    await newLead.save();

    return sendSuccess(res, { lead: newLead }, "Lead created successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all leads with filters
 * @route   GET /api/leads
 * @access  Private
 */
const getAllLeads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const { search, status, source, startDate, endDate } = req.query;
    const startIndex = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate("assignedTo", "name")
      .lean();

    return sendPaginated(res, leads, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    }, "Leads fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get lead by ID
 * @route   GET /api/leads/:id
 * @access  Private
 */
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("assignedTo", "name");
    if (!lead) return sendError(res, "Lead not found", 404);
    return sendSuccess(res, { lead }, "Lead fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update lead details
 * @route   PUT /api/leads/:id
 * @access  Private
 */
const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!lead) return sendError(res, "Lead not found", 404);

    // Conversion logic: if status is changed to Converted
    if (req.body.status === "Converted") {
      const existingClient = await Client.findOne({ leadId: lead._id });
      if (!existingClient) {
        await Client.create({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          services: lead.services,
          source: lead.source,
          budget: lead.budget,
          leadId: lead._id,
          assignedTo: lead.assignedTo,
          notes: lead.notes,
          status: "Active"
        });
      }
    }

    return sendSuccess(res, { lead }, "Lead updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update lead status
 * @route   PATCH /api/leads/:id/status
 * @access  Private
 */
const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!lead) return sendError(res, "Lead not found", 404);

    // Conversion logic: if status is changed to Converted
    if (status === "Converted") {
      console.log(`[CONVERSION] Lead ${lead._id} status changed to Converted. Checking for existing client...`);
      const existingClient = await Client.findOne({ leadId: lead._id });
      if (!existingClient) {
        console.log(`[CONVERSION] No existing client found for lead ${lead._id}. Creating new client...`);
        await Client.create({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          services: lead.services,
          source: lead.source,
          budget: lead.budget,
          leadId: lead._id,
          assignedTo: lead.assignedTo,
          notes: lead.notes,
          status: "Active"
        });
        console.log(`[CONVERSION] Client record created successfully for Lead ${lead._id}`);
      } else {
        console.log(`[CONVERSION] Client already exists for lead ${lead._id}. Skipping creation.`);
      }
    }

    return sendSuccess(res, { lead }, "Lead status updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete lead
 * @route   DELETE /api/leads/:id
 * @access  Private
 */
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return sendError(res, "Lead not found", 404);
    return sendSuccess(res, null, "Lead deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Export leads to CSV
 * @route   GET /api/leads/export
 * @access  Private
 */
const exportLeads = async (req, res, next) => {
  try {
    const { status, source, startDate, endDate } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 }).lean();

    // Convert to CSV
    const fields = ['createdAt', 'name', 'email', 'phone', 'source', 'status', 'budget', 'notes'];
    let csv = fields.join(',') + '\n';
    
    leads.forEach(lead => {
      const row = fields.map(field => {
        let val = lead[field] || '';
        if (field === 'createdAt') val = new Date(val).toLocaleDateString();
        // Escape quotes if any
        val = val.toString().replace(/"/g, '""');
        return `"${val}"`;
      });
      csv += row.join(',') + '\n';
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('leads-export.csv');
    return res.send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  exportLeads,
};
