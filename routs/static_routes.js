const express=require('express')
const rout=express.Router();
rout.get('/',(req,resp)=>{
   resp.send("this is home page");
})
rout.get('/register',(req,resp)=>{
   resp.render('register');
})

rout.get('/login',(req,resp)=>{
   resp.render('login');
})


module.exports=rout;