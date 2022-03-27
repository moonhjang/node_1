// const jwt = require("jsonwebtoken");
// require('dotenv').config();

// exports.verifyToken = (req, res, next) => {
//     try
//     { 
//         req.decoded = jwt.verify(req.cookies.user, process.env.JWT_SECRET);
//         return next();
//     }
//     catch (error) {
//         if (error.name === 'TokenExpireError') {
//             return res.status(419).json({
//             code: 419,
//             message: '토큰만료'
//             });
//         }
//         return res.status(401).json({
//             code: 401,
//             message: '유효하지 않은 토큰'
//         });
//     }
// };




// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     const [tokenType, tokenValue] = authorization.split(' ');
//     console.log( '위치..확인', authorization )
//     console.log( tokenType, tokenValue )
//     console.log('여기를 지나쳤어요')
//     next();
// };



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
        res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
        }
 
    try {
        const { userId } = jwt.verify(authToken, "secretedkey");
        User.findById(userId).then((user) => {
            res.locals.user = user;
            next();
        });
        } catch (err) {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        }
};