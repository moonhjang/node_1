const express = require("express");
const CryptoJS = require("crypto-js"); //비번 암호화
const jwt = require("jsonwebtoken");    
const router = express.Router();
const User = require("../schemas/user");
const Posts = require("../schemas/posts");
const authMiddleware = require("../middlewares/auth-middleware");


const { status } = require("express/lib/response");
const { hash } = require("bcrypt");

const keyForDecrypt = 'mkey' //env


// 게시글 전체목록조회: DB => 클라이언트에 보내기
router.get('/', async (req, res) => {
    const postlist = await Posts.find({}).sort("-createdAt").exec();
    res.json(postlist);
});

// 회원가입: 클라이언트 HTML 보내기
router.get("/users", (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/signup.html'))
});

// 로그인시, 미들웨어로 회원인식 및 회원으로 입장가능
router.get("/users/me", authMiddleware, async (req, res) => {
    // const token = req.header("Authorization")
    const {user} = res.locals;
    res.send({
        user:{
            user
        },
    });
});


// 회원가입
router.post("/users", async (req, res) => {
    const { nickname, pw, confirmpw} = req.body

    console.log(pw)
    //닉네임 표현식 확인
    const is_nickname = /^[a-zA-Z0-9]{3,10}$/ //닉네임 정규표현식
    if (!(is_nickname.test(nickname))) {
        res.status(400).send({
            errorMessage: "닉네임은 최소 3자이상, 알파벳 대소문자, 숫자로만 만들어주세요."
        });
        return; 
    }


    //비밀번호와 비밀번호 재입력이 같은지 확인
    if (pw != confirmpw) {
        res.status(400).send({
            errorMessage: "비밀번호가 일치하지 않습니다."
        });
        return; 
    }

    //비밀번호와 비밀번호 재입력이 같은지 확인
    // if (pw.length < 4) {
    //     res.status(400).send({
    //         errorMessage: "비밀번호는 4자이상으로 만들주세요."
    //     });
    //     return; 
    // }

    //비밀번호와 닉네임과 같은 경우 가입실패 (추가하기)
    if (pw === nickname){
        res.status(400).send({
            errorMessage: "비밀번호와 닉네임이 같습니다."
    });
    return; 
    }

    //같은 이메일과 닉네임이 DB에 있는지 확인
    const existUsers = await User.find({
        $or: [{ nickname }]
    });
    if (existUsers.length) {
        res.status(400).send({
            errorMessage: "중복된 닉네임입니다."
        });
        return;
    }

    //위의 사항이 해당되지 않으면 회원가입성공!
    //비밀번호 암호화
    
    const password = CryptoJS.AES.encrypt(pw, keyForDecrypt).toString();
    console.log(typeof password, "회원가입")

    const user = new User({ nickname, password})
    await user.save();
    res.status(201).send({});       

});


//로그인하기
router.post("/auth", async (req, res) => {
 
    const {nickname, password} = req.body;
    
    const user = await User.findOne({ nickname: nickname});
    const existPw = user.password 
 
    const decryptedPw = CryptoJS.AES.decrypt(existPw,keyForDecrypt);
    const originPw = decryptedPw.toString(CryptoJS.enc.Utf8);

    if (!user) {
        res.status(400).send({errorMessage: '닉네임 또는 비밀번호를 확인해주세요'});
        return;
    }

    if (originPw === password){
        const token = jwt.sign({ nickname : user.nickname}, "secretedkey");
            res.send ({token});
    }

});


module.exports = router;