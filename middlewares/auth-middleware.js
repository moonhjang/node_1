


const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
    console.log(authType)
    console.log(authToken)
    console.log( '위치..확인', authorization )
    console.log('여기를 지나쳤어요')
   

    if (!authToken || authType !== "Bearer") {
        console.log('a')
        res.status(401).json({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
        }
 
    try {
        const { nickname } = jwt.verify(authToken, "secretedkey"); 
            res.locals.nickname = nickname.split(' ');
            console.log('b')
            next();
        } catch (err) {
        console.log('c')    
        res.status(401).json({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        }
};


