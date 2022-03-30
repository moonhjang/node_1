
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  nickname : String,
  content : String,
  commentid : Number,
  
});

module.exports = mongoose.model("Comments", commentSchema);

