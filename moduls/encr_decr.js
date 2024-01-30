const bcrypt=require('bcrypt');
const saltRounds=10;
const hashed_pass= async (myPlaintextPassword)=>
{
    try{
        const hashed_pass= await bcrypt.hash(myPlaintextPassword, saltRounds)
    return hashed_pass;
    }
    catch(err)
    {
        console.log(err);
    }
}
const compare_pass=async(myPlaintextPassword,hashed_pass)=>
{
    return await bcrypt.compare(myPlaintextPassword,hashed_pass);
}

module.exports={hashed_pass,compare_pass}