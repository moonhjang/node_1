const express = require("express");
const postRouter = require("./posts");
const userRouter = require("./user");
const commentRouter = require("./comments");

const router = express.Router();

router.use('/', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

module.exports = router;