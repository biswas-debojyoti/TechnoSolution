require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = "admin@gmail.com";
    const password = "123456"; // Reduced to 6 characters

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`\nAdmin ${email} already exists. Updating password...`);
      existingAdmin.password = password;
      await existingAdmin.save();
      console.log(`✅ Admin ${email} password updated to: ${password}\n`);
    } else {
      console.log(`\nCreating new admin...`);
      await Admin.create({
        email,
        password,
        name: "Super Admin",
        role: "superadmin"
      });
      console.log(`✅ Admin created successfully!`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}\n`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
