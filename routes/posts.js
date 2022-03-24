const express = require("express");
const Posts = require("../schemas/posts")
const router = express.Router();


// /api
// Mainpage(전체조회): DB => 클라이언트에 보내기
router.get('/', async (req, res) => {
    const postlist = await Posts.find({}).sort("-createdAt").exec();
    res.json(postlist);
});


// Posting(정보등록): 클라이언트에 HTML 연결정보 보내기
router.get('/posts', (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/post.html'))
});


//////////////// 비밀번호 암호화 ////////////////////
// Posting(정보등록): 클라이언트 html에서 입력한 정보 => DB로 보내기  /////////(추가작업필요)
// const bcrypt = require('bcrypt');

// app.post('/가입', function (req, res) {
//   bcrypt.hash(req.body.유저가보낸패스워드, 8).then(function(암호화된패스워드) {
//     암호화성공시 실행할 코드~~
//   })
// 암호화 성공시 아이디와 암호화된 비번을 DB에 저장하면 되겠군요
router.post("/posts", async (req, res) => {
    const { user, password, title, content } = req.body

    const date = new Date()
    let postsId = date.valueOf();

    await Posts.create({ postsId, user, password, title, content })
    res.json({ msg: "저장완료" });
    
});


// detail(상세조회): 클라이언트에 HTML 연결정보 보내기
router.get('/posts/:postsId', (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/detail.html'))
});


// detail(상세조회): DB의 내용가져오기
router.get('/posts/:postsId/detail', async (req, res) => {
    const { postsId } = req.params;
    const existPosts = await Posts.find({ postsId: Number(postsId) });
    res.json(existPosts);
});



// detail(상세조회): 클라이언트에 HTML 연결정보 보내기
router.get('/posts/:postsId/edit', (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/edit.html'))
});


 // detail > Edit: DB의 내용가져오기
router.get("/posts/:postsId/get", async (req, res) => {
    const { postsId } = req.params;
    const existPosts = await Posts.find({ postsId: Number(postsId) });
    res.json(existPosts);
})


 // detail > Edit: DB의 내용 수정하기
 router.put("/posts/:postsId/edit", async (req, res) => {
    const { postsId } = req.params;
    const { password, title, content } = req.body;

    const posts = await Posts.find();
    const postsIds = posts.map((post) => post.postsId);
    const postsPws = posts.map((post) => post.password);

    for (let i=0; i<postsIds.length; i++){
        if(postsIds[i] === Number(postsId) && postsPws[i] === password){
            await Posts.updateOne({ postsId: Number(postsId)}, { $set: {title, content} })
            return res.json({ msg: '수정 완료🤸' });

        } else if (postsIds[i] === Number(postsId) && postsPws[i] != password){  
            return res.json({ msg: '비밀번호 불일치🚫' });
        } 
    }
});


//  detail > Edit: DB의 삭제하기
router.delete("/posts/:postsId", async (req, res) => {
    const { postsId } = req.params;
    const { password } = req.body;

    const posts = await Posts.find();
    const postsIds = posts.map((post) => post.postsId);
    const postsPws = posts.map((post) => post.password);

    for (let i=0; i<postsIds.length; i++){
        if(postsIds[i] === Number(postsId) && postsPws[i] === password){
            await Posts.deleteOne({ postsId });
            return res.json({ msg: '삭제 완료🤸' });

        } else if (postsIds[i] === Number(postsId) && postsPws[i] != password){  
            return res.json({ msg: '비밀번호 불일치🚫' });
        } 
    }
});


module.exports = router;