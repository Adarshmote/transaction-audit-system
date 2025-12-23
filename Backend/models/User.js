const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,        // ✅ NUMBER
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0           // ✅ default value
  }
}, { collection: 'users' });  // ✅ specify collection name

module.exports = mongoose.model('User', userSchema);
