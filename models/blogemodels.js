let mongoose = require("mongoose");
let blogschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: [String],
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  tags: {
    type: [String],
    required: true,
  },
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

const blogs = mongoose.model("blogs", blogschema);
module.exports = blogs;
