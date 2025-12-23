const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderId: {
    type: Number,
    required: true
  },
  receiverId: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Success', 'Failed'],
    default: 'Success'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
