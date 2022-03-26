const express = require("express");
const User = require("../schemas/user");
const Posts = require("../schemas/posts");
const router = express.Router();
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/auth-middleware");

// Mainpage(전체조회): DB => 클라이언트에 보내기
router.get('/', async (req, res) => {
    const postlist = await Posts.find({}).sort("-createdAt").exec();
    res.json(postlist);
});


router.get("/users", (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/signup.html'))
});


router.get("/users/me", authMiddleware, async (req, res) => {
    // res.status(400).send({});
    const { user } = res.locals;
    console.log('middleware ME', user)
    res.send({
      user,
    });
});


//회원가입하기 (joi 필요)
router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword} = req.body
    const is_nickname = /^[-a-zA-Z0-9]{3,10}$/ //닉네임 정규표현식

    if (!(is_nickname.test(nickname))) {
        res.status(400).send({
            errorMessage: "닉네임은 최소 3자이상, 알파벳 대소문자, 숫자로만 만들어주세요."
        });
        return; 
    }

    //비밀번호와 비밀번호 재입력이 같은지 확인
    if (password != confirmPassword) {
        res.status(400).send({
             errorMessage: "비밀번호가 일치하지 않습니다."
        });
        return; 
    }

    //비밀번호와 닉네임과 같은 경우 가입실패 (추가하기)
    if (password === nickname){
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
    const user = new User({ nickname, password})
    await user.save();
    console.log("회원가입성공!")
    res.status(201).send({});
});


//로그인하기
router.post("/auth", async (req, res) => {
 
    const {nickname, password} = req.body;

    const user = await User.findOne({ nickname, password }).exec();

    if (!user) {
        res.status(400).send({errorMessage: '아이디 또는 비밀번호가 잘못되었습니다.'});
        return;
    }

    const token = jwt.sign({ userId: user.userId}, "secretedkey");
    console.log('login-token',token)
    res.send({
        token, 
    });
});


module.exports = router;