const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyToken);
        
        const rootUser = await User.findOne({ _id: verifyToken._id})
        if(!rootUser){
            res.status(422).send({error:"User Not Found"})
            throw new Error('User not found')
        } else {
            req.token = token;
            req.rootUser = rootUser;
            req.userID=rootUser._id
            
        }      
        next(); 
            
    } catch (err) {
        res.status(401).send("Unauthorize: No token provided")
        console.log("Error, Unauthorize token");
    }
}

module.exports = Authenticate;