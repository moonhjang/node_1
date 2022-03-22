const express = require("express");
const Posts = require("../schemas/posts")
// const List = require("../schemas/list")
const router = express.Router();


//전체페이지 클라에게 내려주기
router.get("/list", async (req, res) => {
    const postlist = await Posts.find({});

    console.log('전체페이지 클라에게 내려주기_list.js')
    // const sorted_postlist = postlist.sort((a,b) => )
    res.json(postlist);
})

module.exports = router;