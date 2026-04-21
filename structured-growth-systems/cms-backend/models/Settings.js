const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      default: "TechnoSolution"
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    website: {
      type: String,
      trim: true,
    },
    gstin: {
      type: String,
      trim: true,
    },
    logo: {
      type: String, // Base64 or URL
    },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String,
    },
    digitalSignature: {
      type: String, // Name or designation for signature
    }
  },
  {
    timestamps: true,
  }
);

// We only want ONE settings document
settingsSchema.statics.getSingleton = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("Settings", settingsSchema);
