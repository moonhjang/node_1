const express = require("express");
const Posts = require("../schemas/posts")
const User = require("../schemas/user");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const req = require("express/lib/request");


// Comment 작성
router.post("/:postsId", authMiddleware, async (req, res) => {
    const { postsId } = req.params;
    const {content} = req.body
    const nickname = res.locals.nickname+'';
    const post = await Posts.findOne ({ postsId : Number(postsId)})

    if (!content){
        res.status(400).send({errorMessage: '댓글 내용을 입력해주세요🙏'});
        return;
    } 

    if (content){
        post.comments.push({
            nickname: nickname,
            content: content
        })
        await post.save()
        return res.status(200).send({Message: '저장완료🤸'});
    }
});

// Comment 수정
router.put("/:postsId", authMiddleware, async (req, res) => {
    const { postsId } = req.params;
    const {content} = req.body
    const nickname = res.locals.nickname+'';
    const post = await Posts.findOne ({ postsId : Number(postsId)})


    if (!content){
        res.status(400).send({errorMessage: '댓글 내용을 입력해주세요🙏'});
        return;
    } 

    if (content){
        post.comments.push({
            nickname: nickname,
            content: content
        })
        await post.save()
        return res.status(200).send({Message: '저장완료🤸'});
    }
});

// Comment 삭제



module.exports = router;