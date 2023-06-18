const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    fullName:{
        required:true,
        type:String
    }
},{timestamps:true});

const User = mongoose.model('User',usersSchema);
module.exports = User;
