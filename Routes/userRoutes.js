const express = require('express');

const bcrypt = require('bcrypt');

const users = require('../Models/userModel');

const jwt = require("jsonwebtoken");

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send("Welcome to Users Route !")
})


router.post('/register',async(req,res)=>{
    try {
        const {email,password} = req.body;

        const checkUser = await users.findOne({email});

        if(checkUser){
            return res.status(400).send('User Already Exists !')
        }

        const newPass = await bcrypt.hash(password, 10);

        const newUser = await users.create({...req.body, password : newPass})

        res.status(200).send({msg : "New user Registered !", newUser})

        // const 
    } catch (error) {
        res.status(500).send(error)
    }
})


router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;

        const userCheck = await users.findOne({email});

        if( !userCheck){
            return res.status(400).send("User Doesn't exist ...")
        }

        const verify = await bcrypt.compare(password, userCheck.password)

        if(!verify){
            return res.status(400).send("Wrong Password !")
        }

        const token = jwt.sign({userID : userCheck._id, email : userCheck.email},'123',{expiresIn : '5d'});

        res.status(200).send({msg : "Login Successful", token});

        
        
    } catch (error) {
        res.status(500).send(error)
    }
})











module.exports = router;