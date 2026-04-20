const mongoose = require('mongoose');
const Client = require('./models/Client');
require('dotenv').config();

async function checkClients() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techno_solution');
  const count = await Client.countDocuments();
  const clients = await Client.find().limit(5);
  console.log(`Total Clients: ${count}`);
  console.log('Sample Clients:', JSON.stringify(clients, null, 2));
  await mongoose.disconnect();
}

checkClients().catch(console.error);
