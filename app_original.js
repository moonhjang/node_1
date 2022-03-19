const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");  //디비연결
const Todo = require("./models/todo")


mongoose.connect("mongodb://localhost/todo-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi!");
});

router.get("/todos", async(req,res) => {
    const todos = await Todo.find().sort("-order").exec();
    res.send({ todos }); 
});


router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();

  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
  const todo = new Todo({ value, order });
  await todo.save();
  res.send({ todo });
});

app.use("/api", bodyParser.json(), router);
app.use(express.static("./assets"));

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});