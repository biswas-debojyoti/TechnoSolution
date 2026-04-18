const mongoose = require('mongoose');

const uri = 'mongodb://admin%40gmail.com:123456@127.0.0.1:27018/cms_local_db?authSource=admin';

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILURE: Could not connect to MongoDB');
    console.error(err.message);
    process.exit(1);
  });
