const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    gender : {type : String, required : true},
    password : {type : String, required : true},
    post : [{type : mongoose.Schema.Types.ObjectId, ref : "post"}]
})

const users = mongoose.model('user',UserSchema);

module.exports = users;