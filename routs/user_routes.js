const express=require('express');
const profile_controller = require('../controller/user_controller');
const rout=express.Router();
rout.get('/profile',profile_controller)

module.exports=rout;