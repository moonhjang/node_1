const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("list", listSchema);