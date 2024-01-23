const mongoose = require("mongoose");
let usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  Email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  followers: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  following: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

const User = mongoose.model("users", usersSchema);
module.exports = User;
