//session and cookie statefull authontication
const session_id=new Map();
const set_user=(uid,user)=>{
    session_id.set(uid,user);
}

const get_user=(uid)=>{
    return session_id.get(uid);
}

module.exports={set_user,get_user}