const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        console.log('a')
        res.status(401).json({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
        }
 
    try {
        const { nickname } = jwt.verify(authToken, "secretedkey"); 
        User.findOne( {nickname} )
        .exec()
        .then((nickname) => {
            res.locals.user = nickname
            next()
        })    
        } catch (err) {
        console.log('c')    
        
        res.status(401).json({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        }
};


