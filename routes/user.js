const express = require("express");
const User = require("../schemas/user");
const router = express.Router();


router.get("/", (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/signup.html'))
});


//회원가입하기
router.post("/", async (req, res) => {
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


module.exports = router;