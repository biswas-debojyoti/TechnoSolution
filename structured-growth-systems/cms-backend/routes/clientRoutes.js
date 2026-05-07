const express = require("express");
const router = express.Router();
const {
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  addPayment,
  deletePayment,
} = require("../controllers/clientController");
const { protect, requireModuleAccess } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/")
  .get(requireModuleAccess("clients", "read"), getAllClients);

router.route("/:id")
  .get(requireModuleAccess("clients", "read"), getClientById)
  .put(requireModuleAccess("clients", "write"), updateClient)
  .delete(requireModuleAccess("clients", "write"), deleteClient);

router.post("/:id/payments", requireModuleAccess("clients", "write"), addPayment);
router.delete("/:id/payments/:paymentId", requireModuleAccess("clients", "write"), deletePayment);

module.exports = router;
