const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema ({
  uid: String,
  description: String,
  amount: Number,
  type: String,
  date: Date
}, { collection: 'transaction' });

module.exports = mongoose.model('transaction', transactionSchema);