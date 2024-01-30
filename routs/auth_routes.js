const express=require('express')
const rout=express.Router();

const { register_controller,login_controller } = require('../controller/auth_controller');

rout.post('/register',register_controller)
rout.post('/login',login_controller)


module.exports=rout;