const express = require("express");
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");
const router = express.Router();

router.get("/carts", async (req, res) => {

  const carts = await Cart.find();                               // DB carts 목록 가져오기

  const goodsIds = carts.map((cart) => cart.goodsId);            // DB carts의 goodsId변수는 carts.goodsId
  const goods = await Goods.find({ goodsId: goodsIds });         // DB goods에서 carts와 동일한 goodsId 가져오기

  const results = carts.map((cart) => {
		return {
			quantity: cart.quantity,
			goods: goods.find((item) => item.goodsId === cart.goodsId)
		};
  });

  res.json({
    carts: results,
  });
});

module.exports = router;