const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the expense'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Salary', 'Rent', 'Utilities', 'Marketing', 'Software', 'Office Supplies', 'Travel', 'Meals', 'Other']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide the amount']
  },
  date: {
    type: Date,
    required: [true, 'Please provide the date'],
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  receipt: {
    data: Buffer,
    contentType: String,
    filename: String
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'cancelled'],
    default: 'paid'
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Bank Transfer', 'UPI', 'Credit Card', 'Check'],
    default: 'UPI'
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
