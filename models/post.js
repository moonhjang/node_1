
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user_name: {
        type: String,
        min: 3,
        max: 12,
        required: true,
    },
    password: String,
    title: String,
    content: String,
    createdAt: {
        type: Date,
        defalt: Date.now()
    }, 
    order: Number
  },
  {
    timestamps: true
  }
  );

PostSchema.virtual("postId").get(function () {
return this._id.toHexString();
});

PostSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Post", PostSchema);

