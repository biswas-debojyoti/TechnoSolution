/**
 * Seed script to create the initial admin user.
 * Run once: node utils/seedAdmin.js
 *
 * Update the credentials below before running.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const connectDB = require("../config/db");

const seedAdmin = async () => {
  await connectDB();

  const email = "admin@gmail.com";
  const password = "123456";
  const name = "Super Admin";

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log(`⚠️  Admin already exists: ${email}`);
      process.exit(0);
    }

    const admin = await Admin.create({
      email,
      password,
      name,
      role: "superadmin",
    });

    // console.log("✅ Admin created successfully!");
    // console.log(`   Email   : ${admin.email}`);
    // console.log(`   Role    : ${admin.role}`);
    // console.log(`   ID      : ${admin._id}`);
    // console.log("\n⚠️  IMPORTANT: Change the default password immediately after first login.");
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedAdmin();
