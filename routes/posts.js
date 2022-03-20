const express = require("express");
const Posts = require("../schemas/posts")
const router = express.Router();

// const bodyParser = require("body-parser");  //post ejs 양식을 위해 추가됨
// const app = express();

// // 1
// router.get("/posts",(req,res) => {
//   res.render('post', {"id": "아무개야~", "title": "타이틀"});
// });

// 1_원본  /api 찍었을때 나옴.
router.get('/',(req,res) => {
    res.send('this is root page')
});

const posts = [
    {
      postsId: 4,
      user: "상품 4",
      password:
      "qwerasdf",
      title: "drink",
      content: "drink",
      createAt: 2022/03/02,
    },
    {
      postsId: 3,
      user: "상품 3",
      password:
      "qwerasdf",
      title: "drink",
      content: "drink",
      createAt: 2022/03/02,
    },
    {
      postsId: 2,
      user: "상품 2",
      password:
      "qwerasdf",
      title: "drink",
      content: "drink",
      createAt: 2022/03/02,
    },
    {
      postsId: 1,
      user: "상품 1",
      password:
      "qwerasdf",
      title: "drink",
      content: "drink",
      createdAt: 2022/03/02,
    },
  ];

router.get('/posts',(req,res) => {
    res.json({
        posts,
    });
});

router.get('/posts/:postsId', (req,res) => {
    const postsId = req.params.postsId;

    const [detail] = posts.filter((item) => item.postsId === Number(postsId))
    res.json({
        detail,
    });
})

router.post("/posts", async (req,res) => {
    const { postsId, password, user, title, content, createdAt } = req.body;

    const posts = await Posts.find({postsId});
    if (posts.length) {
      return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다."});
    }

    const createdPosts = await Posts.create({ postsId, password, user, title, content, createdAt })

    res.json({ posts: createdPosts});
});

module.exports = router;