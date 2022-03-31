require("dotenv").config();
const express = require("express");
const connect = require("./schemas/index.js");
const cors = require("cors")

const routers = require("./routes")
const app = express();
const port = 3000;


connect();


// 미들웨어 (가장 상위에 위치)
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
}

app.use(cors());
app.use(express.static("static"))
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use(requestMiddleware);


app.use('/api', routers);

//도메인
app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!')
}); 