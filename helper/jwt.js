const jwt = require('jsonwebtoken');
const secret_key="vickyjaiswal"
const secret_key_refresh="ravijaiswal"
const get_token=async(user)=>
{
    const token=await jwt.sign(
        {
            name:user[0].name,
            email:user[0].email
        },secret_key,{expiresIn: '1m' }
    );
    return token;
}

const get_refresh_token=async(user)=>
{
    const token=await jwt.sign(
        {
            name:user[0].name,
            email:user[0].email
        },secret_key_refresh,{expiresIn: '2m' }
    );
    return token;
}

const varify_token=async (token)=>
{
    return new Promise((resolve, reject) => {
         jwt.verify(token, secret_key, (err, decoded) => { //in every function if callback result went to store another file var than must pass callback function into prommise than resolve result
          if (err) {
            // Handle verification error
            // console.log("err",err);
            reject(err);
          } else {
            // Resolve with the decoded payload
            // console.log(decoded)
            resolve(decoded);
          }
        });
      });
      
}

const varify_refresh_token=async (token)=>
{
    return new Promise((resolve, reject) => {
         jwt.verify(token, secret_key_refresh, (err, decoded) => { //in every function if callback result went to store another file var than must pass callback function into prommise than resolve result
          if (err) {
            // Handle verification error
            // console.log("err",err);
            reject(err);
          } else {
            // Resolve with the decoded payload
            // console.log(decoded)
            resolve(decoded);
          }
        });
      });
      
}
module.exports={get_token,varify_token,get_refresh_token,varify_refresh_token}