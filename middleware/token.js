const jwt=require("jsonwebtoken");
const key="nowandmetask"

const getToken=(userid)=>{
    try{
        let data={userid}
    let token=jwt.sign(data,key);
      return token
    }
    catch(e){
        return null;
    }
}

const verifyToken=(req,res,next)=>{
    try{
        if(req.headers.auth){
            let token=req.headers.auth;
            let data=jwt.verify(token,key);
            if(data){
                req.body['userid']=data.userid;
                next();
            }
            else{
                return res.status(401).json({status:false})
            }
        }
        else{
            return res.status(401).json({status:false})
        }
    }
    catch(e){
        return res.status(500).json({status:false});
    }
}

module.exports={getToken,verifyToken};