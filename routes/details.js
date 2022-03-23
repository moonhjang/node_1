const express = require("express");
const Posts = require("../schemas/posts")
const router = express.Router();


// detail(상세조회): DB의 내용가져오기
router.get('/posts/:postsId', async (req, res) => {
    
    const { postsId } = req.params;

    const existPosts = await Posts.find({ postsId: Number(postsId) });
    const path = require("path")

    res.json(existPosts)  
});



module.exports = router;