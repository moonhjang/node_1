const express = require("express");
const Posts = require("../schemas/posts")
const User = require("../schemas/user");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const req = require("express/lib/request");


// Posting detail(상세조회): DB의 내용가져오기
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
    const commentid = post.comments.length +1
    console.log('코멘트 아이디', commentid)

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
router.put("/:postsId", authMiddleware, async (req, res) => {
    const { postsId } = req.params;
    const { nickname, content} = req.body    //코멘트 아이디
    const confirmNickname = res.locals.nickname+''; //로그인한 아이디
    const post = await Posts.findOne ({ postsId : Number(postsId)})  //게시글

    console.log('확인',nickname, content,confirmNickname,post.comments)
    console.log('확인2',confirmNickname)
    console.log('확인3',post.comments)

    if (nickname===confirmNickname) {
        
    }
    // if (!content){
    //     res.status(400).send({errorMessage: '댓글 내용을 입력해주세요🙏'});
    //     return;
    // } 

    // if (content){

    //     post.comments.push({
    //         nickname: nickname,
    //         content: content
    //     })
    //     await post.save()
    //     return res.status(200).send({Message: '저장완료🤸'});
    // }
});

// Comment 삭제



module.exports = router;