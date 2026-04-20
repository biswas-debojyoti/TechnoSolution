const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[+\d\s\-().]{7,20}$/, "Please provide a valid phone number"],
    },
    source: {
      type: String,
      enum: {
        values: ["Website", "Referral", "Social Media", "Cold Call", "Other"],
        message: "Invalid lead source",
      },
      default: "Website",
    },
    status: {
      type: String,
      enum: {
        values: ["New", "Contacted", "Qualified", "Lost", "Converted"],
        message: "Invalid lead status",
      },
      default: "New",
    },
    budget: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
    },
    services: {
      type: [String],
      default: [],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster filtering
leadSchema.index({ status: 1, source: 1, createdAt: -1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ email: 1 });

module.exports = mongoose.model("Lead", leadSchema);
