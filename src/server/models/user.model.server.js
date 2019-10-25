const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
  username:  { type: String, required: true },
  password:  { type: String, required: true },
  balance:   { type: Number, default: 0 },
  threshold: { type: Number, default: 0 } 
}, {collection: 'user'});

module.exports = mongoose.model('user', userSchema);