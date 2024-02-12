const connection=require('../moduls/connection');

const profile_controller=(req,resp)=>{
    const user=req.user;
    const id=req.params.id;
    connection.query("select * from user where email=?",[req.body.email],async (err,res,fiels)=>{
        if(err)
        {
          resp.send(err);
        }
        else{
        // console.log(res[0].password);
     resp.status(200).json({details:res[0]})
          
    // resp.render('profile',{user});
        }
})
}

module.exports=profile_controller