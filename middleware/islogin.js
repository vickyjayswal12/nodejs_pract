const { varify_token, get_token, varify_refresh_token } = require("../helper/jwt");
const { get_user } = require("../helper/session");

// const islogin=(req,resp,next)=>{

// //using session id session id

// // console.log(req.cookies.uid);
// // console.log(get_user(req.cookies.uid))
// if(!req.cookies.uid)
// {
//     resp.redirect('/login')
// }
// else{
//     console.log(get_user(req.cookies.uid)) //if server restart after login than not work
//     if(!get_user(req.cookies.uid)) //if session key changed from user than
//     {
//         resp.redirect('/login')
//     }
//     else{
//         req.user=get_user(req.cookies.uid);
//         next();
//     }
// }

// }




// by jwt token

const islogin=async(req,resp,next)=>{

    //using session id session id
    
    // console.log(req.cookies.uid);
    // console.log(get_user(req.cookies.uid))

    if(!req.cookies.token)
    {
        resp.redirect('/login')
    }
    else{
        try {
            const user= await varify_token(req.cookies.token);
            //  console.log("user",user)
             req.user={name:user.name,email:user.email}
              next();
            }
         catch (error) {
            // console.log(error)
            // resp.send(error)
            // resp.redirect('/login')

            //if access token expired
            if(error.name==="TokenExpiredError")
            {
              try {
                
                
              const user=await varify_refresh_token(req.cookies.refresh_token);
              console.log("user",user)
              
              const token=await get_token([{name:user.name,email:user.email}])
              console.log(token);
              resp.cookie('token',token);
            // console.log(req.url);
            // resp.redirect(`user${req.url}`)
            req.user={name:user.name,email:user.email}
              next();

              } catch (error) {
                // resp.send("your refersh token also expired")
                resp.redirect('/login')
              }


            }
            else{
               
                resp.send(error)
            }

            //user 
        }
    }
    
    
    }
module.exports=islogin;