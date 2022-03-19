const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo")


//DB 연결
mongoose.connect("mongodb://localhost/post_info", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


const app = express();
const router = express.Router();

//EJS 템플릿
app.set('view engine', 'ejs');

app.get("/", function(req,res){
  res.render('index', {"name": "관리자"});
});

app.get("/find", function(req,res){
  res.render('findpost', {"name": "관리자"});
});

app.get("/edit", function(req,res){
  res.render('editpost', {"name": "관리자"});
});

app.get("/post", function(req,res){
  res.render('post', {"name": "관리자"});
});


// router.get("/todos", async(req,res) => {
//     const todos = await Todo.find().sort("-order").exec();  //역순으로 조회될때 참고,
//     res.send({ todos }); 
// });


// router.post("/todos", async (req, res) => {
//   const { value } = req.body;
//   const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

//   const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
//   const todo = new Todo({ value, order });
//   await todo.save();
//   res.send({ todo });
// });



//도메인
app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});
