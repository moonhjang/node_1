const express = require("express");
const Post = require("./posts");
const userRouter = require("./user");

const router = express.Router();

router.use('/', Post);
router.use('/users', userRouter);

module.exports = router;