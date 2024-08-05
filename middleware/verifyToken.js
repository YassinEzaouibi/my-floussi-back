const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            msg: "No Token, authorization denied"
        });
    }
    try{
        req.user = jwt.verify(
            token.split(" ")[1],
            keys.secretOrKey
        );
        next();
    }catch (e){
        res.status(400).json({
            msg: "Token is not valid"
        })
    }
}

module.exports = verifyToken;