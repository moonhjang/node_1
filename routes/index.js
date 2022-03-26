const express = require("express");
const Post = require("./posts");
const userRouter = require("./user");

const router = express.Router();

router.use('/', userRouter);
router.use('/posts', Post);


module.exports = router;