const express = require("express");
const connect = require("./schemas/index.js");
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();
const port = 3000;


connect();

const postsRouter = require('./routes/posts');

// 미들웨어 사용 (가장 상위에 위치)
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
}

app.use(cors());
app.use(express.static("static"))
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(requestMiddleware);

app.use('/api', [postsRouter]);

//도메인
app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!')
}); 