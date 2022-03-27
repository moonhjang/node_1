const express = require("express");
const User = require("../schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken")
// const authMiddleware = require("./middlewares/auth-middleware");

// router.get("/", (req, res) => {
//     const path = require("path")
//     res.sendFile(path.join(__dirname + '/../static/signup.html'))
// });


//로그인하기
router.post("/auth", async (req, res) => {
    console.log('login')
    const {nickname, password} = req.body;

    const user = await User.findOne({ nickname, password }).exec();

    if (!user) {
        res.status(400).send({errorMessage: '아이디 또는 비밀번호가 잘못되었습니다.'});
        return;
    }
    console.log('login2')
    const token = jwt.sign({ userId: user.userId}, "secretedkey");
    res.send({
        token, 
    });
});


module.exports = router;