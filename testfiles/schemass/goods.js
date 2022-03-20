const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {         //특유의...!! 필요
    type: Number,
    required: true,
    unique: true      //정보가 겹치면 안된다!
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  thumbnailUrl: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model("Goods", goodsSchema);