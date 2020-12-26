const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
