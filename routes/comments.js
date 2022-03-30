const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const req = require("express/lib/request");

// Comment 조회
router.get('/:postsId', async (req, res) => {
    const { postsId } = req.params;
    const existPosts = await Posts.find({ postsId: Number(postsId) });
    res.json(existPosts);
});

// Comment 작성
router.post("/:postsId", authMiddleware, async (req, res) => {
    const { postsId } = req.params;
    const {content} = req.body
    const nickname = res.locals.nickname+'';
    const post = await Posts.findOne ({ postsId : Number(postsId)})

    //Commentid: 날짜기준으로 번호 만들기
    const date = new Date()
    const commentid = date.valueOf();

    if (!content){
        res.status(400).send({errorMessage: '댓글 내용을 입력해주세요🙏'});
        return;
    } 

    if (content){
        post.comments.push({
            commentid: commentid,
            nickname: nickname,
            content: content
        })
        await post.save()
        return res.status(200).send({Message: '저장완료🤸'});
    }
});


// Comment 수정
router.patch("/:postsId/:commentId", authMiddleware, async (req, res) => {
    const {postsId,commentId} = req.params;
    const {content} = req.body    //코멘트 아이디

    try {
        await Posts.updateOne(
        { postsId : Number(postsId), "comments.commentid": Number(commentId)},
        { $set: {"comments.$.content": content} });
        return res.status(200).send({Message: '저장완료🤸'});
    } catch (error) {
        return res.status(400).send({Message: '저장실패!'});
    }
});


// Comment 삭제
router.delete("/:postsId/:commentId", async (req, res) => {
    const {postsId,commentId} = req.params;
    const {content} = req.body    //코멘트 아이디

    Posts.findOneAndUpdate(
        { postsId : Number(postsId)},
        {   $pull: {comments: {commentid: commentId}}},
        { new: true},
        function(err) {
            if(err) {console.log(err)}
        }
    )
});



module.exports = router;