const express = require("express");
// const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post")
// const Todo = require("./models/todo")



//DB 연결
mongoose.connect("mongodb://localhost/post_info", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


const app = express();
const router = express.Router();


app.set('view engine', 'ejs');                                //EJS 템플릿
app.use(bodyParser.urlencoded({extended : false}));            // URL 인코딩 안함 (bodyParser)
app.use(bodyParser.json());                                   // json 타입으로 파싱하게 설정  (bodyParser)
app.use(express.static(__dirname + '/'));


app.get("/", function(req,res){
  res.render('index', {"id": "아무개야~", "title": "타이틀"});
});



app.get("/posts", function(req,res){
  res.render('post', {"id": "아무개야~", "title": "타이틀"});
});

app.post("/posts_save", function(req,res){
  var user = req.body.user;
  var title = req.body.title;
  var content = req.body.content;

  const post = new Post({ user, title });
  post.save();
  res.send("제목 : " + title + "\n" + "내용 : " + content)
});


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

router.post("/posts", async (req, res) => {
  console.log(req.body);
  // const { user } = req.body;
  // console.log({user})
  // const maxOrderByUserId = await Post.findOne().sort("-order").exec();

  // const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
  // const post = new Post({ user, title });
  // console.log(post)
  // await todo.save();
  res.send(req.body);
});

app.use("/api", bodyParser.json(), router);


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
app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
