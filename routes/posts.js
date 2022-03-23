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
    console.log('postsId_________________', postsId)
    const existPosts = await Posts.find({ postsId: Number(postsId) });
    const path = require("path")
    console.log(existPosts)
    res.json(existPosts);
});


//  // 리스트에서 posting 수정 (1번째~~~~!)
// router.put("/posts/:postsId/list", async (req, res) => {
//     const { postsId } = req.params;
//     const { quantity } = req.body;

//     const existsLists = await List.find({ postsId: Number(postsId) });
//     if (existsLists.length) {
//         await List.updateOne({ postsId: Number(postsId)}, { $set: {quantity} });
//     }

//     res.json({ result: "수정완료" });
// })


//  리스트에서 posting 삭제  (2번째~~~~!)
// router.delete("/posts/:postsId", async (req, res) => {
//   const { postsId } = req.params;


//   const existsLists = await Posts.find({ postsId: Number(postsId) }); 
//   if (existsLists.length > 0) {
//       await List.deleteOne({ postsId });
//     }

//   res.json({ result: "Post 삭제완료" });
// });


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