const { v4: uuidv4 } = require('uuid');
const{hashed_pass,compare_pass}=require('../moduls/encr_decr');
const connection=require('../moduls/connection');
const { set_user, get_user } = require('../helper/session');
const { get_token, get_refresh_token } = require('../helper/jwt');


const register_controller=async(req,resp)=>{
    console.log(req.body)
    const hashed_passwd=await hashed_pass(req.body.password)
    // console.log(hashed_passwd);
    const data={
        name:req.body.name,
        email:req.body.email,
        password:hashed_passwd
    }

    connection.query("insert into user set?",data,(err,res,fiels)=>{
        if(err)
        {
          resp.send(err);
        }
        else{
        //   resp.send(res)
        // console.log(res,fiels);
        resp.redirect('/login')
        }
    
      })
   

 }





 const login_controller=async(req,resp)=>{
    // console.log(req.body)
    // const hashed_passwd='$2b$10$XBGaYd9HFe9HWoHGDAf6pOzwX6uNqv1JiGMolDjbAdNMQotA1PV4m'

    connection.query("select * from user where email=?",[req.body.email],async (err,res,fiels)=>{
        if(err)
        {
          resp.send(err);
        }
        else{
        // console.log(res[0].password);
          const myPlaintextPassword=req.body.password;
          const hashed_pass=res[0].password.toString()
          const result=await compare_pass(myPlaintextPassword,hashed_pass)
          if(result)
          {
            // //by session id statefull authountication:-------

            // const uid=uuidv4();
            // set_user(uid,{name:res[0].name,email:res[0].email})
            // // console.log(uid);
            // // console.log(get_user(uid));

            // resp.cookie('uid',uid);

            // resp.redirect('/');



             //by using jwt web token:-----------
            
            // const token=await get_token(res);
            // // console.log(token)
            //  resp.cookie('token',token);

            // resp.redirect('/');


            //after acces and refress jwt token :--------

             const token=await get_token(res);
             const refresh_token=await get_refresh_token(res)
             
            // console.log(token)
             resp.cookie('token',token);
             resp.cookie('refresh_token',refresh_token);

            resp.redirect('/');
          }
          else{
            resp.send("invalid email or password")
            // resp.redirect('/login');

          }
        // resp.send("you have login successfully")
        }})
    // const hashed=await copmare_pass(req.body.password,hashed_passwd)
    // console.log(hashed_pass);
    // resp.redirect('/')

 }

 module.exports={register_controller,login_controller}