const express = require("express");
const connect = require("./schemas/index.js");
const cors = require("cors")
// const bodyParser = require("body-parser");  //추가
const app = express();
const port = 8080;

connect();

const postsRouter = require('./routes/posts');


// 미들웨어 사용 (가장 상위에 위치)
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, '  -  ', new Date());
    next();
}

app.use(cors());
app.use(express.static("static"))
app.use(express.json());
app.use(requestMiddleware);

// // 전체페이지 클라에 내려주기
// app.get('/', (req, res) => {
//     console.log('전체페이지 클라에 내려주기')
//     res.sendFile(__dirname+'/static/index.html');
// });

// app.get('/', async (req, res) => {
//     const postlist = await Posts.find({});
//     console.log('전체페이지 클라에 내려주기2')
//     res.json(postlist);
// });

app.use('/api', [postsRouter]);

// app.post("/posts_save", function(req,res){
//   var user = req.body.user;
//   var title = req.body.title;
//   var content = req.body.content;

//   const post = new Post({ user, title });
//   post.save();
//   res.send("제목 : " + title + "\n" + "내용 : " + content)
// });


// app.post("/posts", function(req, res) {
//   console.log(req.body);
//   res.json({ ok : true})       //클라이언트 성공 신호보내기
// })

// router.get("/posts/save", async(req,res) => {
//     let user = req.query.user;
//     let title = req.query.title;
//     let content = req.query.content;

//     res.send("제목:" + title +"\n" +"내용 : "+ content)

//     // const posts = await Post.find().sort("-order").exec();  //역순으로 조회될때 참고,
//     // res.send({ posts }); 
// });



// router.post("/posts", async (req, res) => {
//   console.log(req.body);
//   // const { user } = req.body;
//   // console.log({user})
//   // const maxOrderByUserId = await Post.findOne().sort("-order").exec();

//   // const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
//   // const post = new Post({ user, title });
//   // console.log(post)
//   // await todo.save();
//   res.send(req.body);
// });

// app.use("/api", bodyParser.json(), router);


// router.post("/posts", async (req, res) => {
//   const { id, password, title, content } = req.body;
//   const maxOrderByUserId = await Post.findOne().sort("-order").exec();

//   const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
//   const post = new Post({ id, password, title, content, createdAt: Date.now(), order });
//   await post.save();
//   return res.redirect("/");
  
// });


// router.get("/posts", async(req,res) => {
//     const posts = await Post.find().sort("-order").exec();  //역순으로 조회될때 참고,
//     res.send({ posts }); 
// });

// app.get("/find", function(req,res){
//   res.render('findpost', {"name": "이름"});
// });



//도메인
app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!')
}); 