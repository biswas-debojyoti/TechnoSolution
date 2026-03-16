const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[+\d\s\-().]{7,20}$/, "Please provide a valid phone number"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["new", "contacted", "closed"],
        message: "Status must be new, contacted, or closed",
      },
      default: "new",
    },
    ipAddress: {
      type: String,
    },
    notes: {
      // Internal admin notes
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ email: 1 });

module.exports = mongoose.model("Inquiry", inquirySchema);
