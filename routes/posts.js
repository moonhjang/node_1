const express = require("express");
const Posts = require("../schemas/posts")
const router = express.Router();


// router.get("/posts/list", async (req, res) => {
    
//     const lists = await List.find();
//     const postsIds = lists.map((list) => list.postsId);
//     const posts = await Posts.find({ postsId: postsIds });
//     console.log(posts)
//     const results = lists.map((list) => {
//     return {
//         quantity: list.quantity,
//         posts: posts.find((item) => item.postsId === list.postsId)
//       };
//     });

//     res.json({
//       lists: results,
//     });
// });

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

    res.json({ msg: "저장완료" });
    await Posts.create({ postsId, user, password, title, content })
    
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

 // detail > Edit: DB의 내용 수정하기 (작업중~)
 router.put("/posts/:postsId/edit", async (req, res) => {
    const { postsId } = req.params;
    const { password, title, content } = req.body;

    const existsPosts = await Posts.find({ postsId: Number(postsId) });
    const existsPw = await Posts.find({},{_id:0,password:1});
    const existsId = await Posts.find({},{_id:0,postsId:1});
    const Id = {'postsId': Number(postsId)}
    const newPw = {'password': password}

    console.log('이거다 이거야~',e);


    // 비밀번호확인 없이 저장
    // if (existsPosts.length) {
    // await Posts.updateOne({ postsId: Number(postsId)}, { $set: {title, content} });

    // res.json({ msg: "수정완료" });
    //end of 비밀번호확인 없이 저장
    
    // const existspw = await Posts.find({ password: password });
   
    // 비밀번호 확인 후 저장 (번호가 맞아도 비밀번호가 다릅니다라고 활성화)
    // if (existsPosts.length) {
    //     if (existspw === password){
    //         await Posts.updateOne({ postsId: Number(postsId)}, { $set: {title, content} });
    //         res.json({ result: "수정완료" });
    //     } else {
    //         res.json({ result: "비밀번호가 다릅니다." });
    //     }
    // endof  비밀번호 확인 후 저장   

});


//  detail > Edit: DB의 삭제하기
router.delete("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;


  const existsLists = await Posts.find({ postsId: Number(postsId) }); 
  if (existsLists.length > 0) {
      await Posts.deleteOne({ postsId });
    }

  res.json({ msg: "Post 삭제완료" });
});


// // 리스트에 posting 추가 (삭제예정)
// router.post("/posts/:postsId/list", async (req, res) => {
//     const { postsId } = req.params;
//     const { quantity } = req.body;
  
//     const existsLists = await List.find({ postsId: Number(postsId) });
//     if (existsLists.length) {
//       return res.json({ success: false, errorMessage: "이미 리스트에 존재하는 포스트입니다." });
//     }
  
//     await List.create({ postsId: Number(postsId), quantity: quantity });
//     res.json({ result: "success" });
// }); 


module.exports = router;