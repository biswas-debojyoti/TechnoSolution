require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const seedAdmin = async () => {
  try {
    // 🔥 Connect using .env (must point to localhost:27017)
    await connectDB();

    const email = "admin@gmail.com";
    const plainPassword = "123456";

    // 🔐 Hash password (VERY IMPORTANT)
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`\nAdmin ${email} already exists. Updating password...`);

      existingAdmin.password = hashedPassword;
      await existingAdmin.save();

      console.log(`✅ Admin password updated`);
    } else {
      console.log(`\nCreating new admin...`);

      await Admin.create({
        email,
        password: hashedPassword,
        name: "Super Admin",
        role: "superadmin",
      });

      console.log(`✅ Admin created successfully!`);
    }

    console.log(`\nLogin Credentials:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${plainPassword}\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();