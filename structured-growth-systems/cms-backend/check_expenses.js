const mongoose = require('mongoose');
const Expense = require('./models/Expense');
require('dotenv').config();

async function checkExpenses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const count = await Expense.countDocuments();
    console.log('Total expenses in DB:', count);
    
    const expenses = await Expense.find().select('title amount').limit(10);
    console.log('Last 10 expenses:', JSON.stringify(expenses, null, 2));
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

checkExpenses();
