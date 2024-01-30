const profile_controller=(req,resp)=>{
    const user=req.user;
    resp.render('profile',{user});
}
module.exports=profile_controller