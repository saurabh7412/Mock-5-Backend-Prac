

const users = require("../Models/userModel");

const jwt = require("jsonwebtoken");

const Auth = async(req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(400).send("Login First !")
    }

    const decoded = jwt.verify(token, "123");

    if(!decoded){
        return res.status(400).send("User not Authorized !")
    }

    else{
        let result = await users.findById(decoded.userID);

        if(result){
            req.body.uniID = decoded.userID
            req.body.uniEmail = decoded.email

            next()
        }else{
            return res.status(400).send("User Doesn't exist in Auth...")
        }
    }

}

module.exports = Auth;