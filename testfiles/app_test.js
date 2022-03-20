//기초주차 강의
const express = require("express");
const connect = require("../schemas/index");
const app = express();
const port = 3000;

connect();

const goodsRouter = require('../routes/goods');

// 미들웨어 사용 (가장 상위에 위치)
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, '  -  ', new Date());
    next();
}

app.use(express.json());
app.use(requestMiddleware);

app.use('/api', [goodsRouter]);

app.get('/', (req, res) => {
    res.send("Hello World!");
});


// 서버를 Port로 켜서, 두번째 요소로 호출
app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌어요!')
}); 