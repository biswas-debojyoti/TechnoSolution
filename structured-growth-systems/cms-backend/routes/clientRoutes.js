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
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/")
  .get(getAllClients);

router.route("/:id")
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient);

router.post("/:id/payments", addPayment);
router.delete("/:id/payments/:paymentId", deletePayment);

module.exports = router;
