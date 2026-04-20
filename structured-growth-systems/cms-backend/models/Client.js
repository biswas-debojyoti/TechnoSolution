const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  method: { type: String, enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Other"], default: "UPI" },
  status: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
  reference: { type: String, trim: true },
  notes: { type: String, trim: true }
}, { timestamps: true });

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    services: {
      type: [String],
      default: [],
    },
    source: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "On Hold"],
      default: "Active",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    notes: {
      type: String,
      trim: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    budget: {
      type: String,
      trim: true,
    },
    totalValue: {
      type: Number,
      default: 0,
    },
    payments: [paymentSchema]
  },
  {
    timestamps: true,
  }
);

clientSchema.index({ status: 1, name: 1 });

module.exports = mongoose.model("Client", clientSchema);
