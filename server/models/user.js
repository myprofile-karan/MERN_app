const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  role:{
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  token: {
    type: String,
    default: null,
  },
});

const User = mongoose.models.users || mongoose.model("User", userSchema);
module.exports = User;
