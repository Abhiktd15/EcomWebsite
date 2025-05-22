const passport = require('passport');
const jwt = require('jsonwebtoken')

exports.isAuth = async(req, res, next) => {
    const token = req.cookies.jwt
    if(!token){
        return res.status(401).json({
            message:"User not authenticated",
            success:false
        })
    }
    const decodeToken = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decodeToken){
        return res.status(401).json({
            message:"Invalid Token",
            success:false
        })
    }
    req.user = decodeToken
    next();
};

exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    //TODO : this is temporary token for testing without cookie
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjE5NTg4YzU3ZGQxYzQzZjZjNGRhZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEwMzMxMjcyfQ.qzb-_aHKNPzRro5RFgaLSUQ7iaY68FPC0VOejTxxmH0"
    return token;
};