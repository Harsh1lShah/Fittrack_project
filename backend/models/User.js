const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['member', 'staff', 'owner'], default: 'member' },
  memberId: { type: String, unique: true }, // Unique ID generated for the member
  profilePicture: { type: String },
  joinedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
