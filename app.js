const express = require("express");
const connect = require("./schemas/index.js");
// const bodyParser = require("body-parser");  //추가
// const Post = require("./models/post")
const app = express();
const port = 8080;


// const router = express.Router(); //추가

connect();
// 삭제예정
// const Todo = require("./models/todo")
// const mongoose = require("mongoose");

//DB 연결
// mongoose.connect("mongodb://localhost/post_info", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));


const postsRouter = require('./routes/posts');
const listsRouter = require('./routes/lists');

// 미들웨어 사용 (가장 상위에 위치)
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, '  -  ', new Date());
    next();
}

app.use(express.json());
app.use(requestMiddleware);

app.use('/api', [postsRouter, listsRouter]);



// app.set('view engine', 'ejs');                                //EJS 템플릿
// app.use(bodyParser.urlencoded({extended : false}));            // URL 인코딩 안함 (bodyParser)
// app.use(bodyParser.json());                                   // json 타입으로 파싱하게 설정  (bodyParser)
// app.use(express.static(__dirname + '/'));


app.get('/', (req, res) => {
    res.send("Hello World!");
});


// app.get('/', (req, res) => {
//   res.render('index', {"id": "아무개야~", "title": "타이틀"});
// });


// app.get("/", function(req,res){
//   res.render('index', {"id": "아무개야~", "title": "타이틀"});
// });


// app.get("/posts", function(req,res){
//   res.render('post', {"id": "아무개야~", "title": "타이틀"});
// });

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


// 1. 포스트 전체페이지 포스트 전체 받아오기  ##post는 어디에서 가져온것일까.
// router.get("/posts", async (req, res) => {
//   console.log ({ post })
//   // const { post } = req.query;        

//   // const posts = await Posts.find({ post });
  
//   res.json({
//     posts,
//   });
// });


// 2. 상세조회
// router.get("/posts/:userId", async (req, res) => {
//   console.log ({ userId }) = req.params;

//   const [defalt] = await Posts.find({ })
//   // const { post } = req.query;        

//   // const posts = await Post.find({ post });
  
//   res.json({
//     posts,
//   });
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

// app.get("/:title", async (req,res) => {
//   let {title} = req.params;

//   if (title == 'seoul'){
//     let data = [
//       {"id": "홍길동", "title": "seoul"},
//       {"id": "김청수", "title": "seoul"}
//     ];
//     res.send(data);
//   }else if (title == 'jeju') {
//     let data = [
//       {name: "아무개", title: "jeju"},
//       {name: "화이팅", title: "jeju"}
//     ];
//     res.send(data);
//   }else {
//     res.send('Title is not correct.')
//   }


  // res.render('post.ejs', {"name": "관리자"});

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