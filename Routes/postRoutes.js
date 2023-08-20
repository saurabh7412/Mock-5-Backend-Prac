const express = require("express");

const router = express.Router();

const posts = require("../Models/postModel");

const Auth = require("../Middlewares/Auth");

const users = require("../Models/userModel");

router.get("/", Auth, async (req, res) => {

  try {

    const {device, device1, device2} = req.query;
    let filter = {};

    if(device){
        filter.device = {$regex : device, $options : "i"}
    }

    if(device1){
        filter.device = {$regex : device1, $options : "i"}
    }

    if(device2){
        filter.device = {$regex : device2, $options : "i"}
    }

    const checkPosts = await posts.find(filter)

    return res.status(200).send({checkPosts});


  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
