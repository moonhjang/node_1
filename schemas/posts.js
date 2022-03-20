
const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    postsId: {
      type: Number,
      required: true,
      unique: true 
    },
    user: {
        type: String,
        min: 3,
        max: 12,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
      },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        defalt: Date.now()
    }
  },
  {
    timestamps: true
  }
  );

module.exports = mongoose.model("Posts", postsSchema);

