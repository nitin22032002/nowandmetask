const {validationResult}=require("express-validator")
const checkUserName=async(req,res,next)=>{
    try{
        let db=req.body.db;
        db.get(`select userid from user where username='${req.body.username}'`,(err,data)=>{
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else if(data){
                return res.status(401).json({status:false,err:"Username Already Exist"})
            }
            else{
                next();
            }
        })
    }
    catch(e){
        return res.status(500).json({status:false})
    }
}

const checkThoughtId=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.get(`select userid from thought where thoughtid='${req.params.thoughtid}' and userid=${req.body.userid}`,(err,data)=>{
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else if(data){
                next()
            }
            else{
                return res.status(401).json({status:false,err:"Invalid User"})
            }
        })
    }
    catch(e){
        return res.status(500).json({status:false})
    }
}

const validate=(req,res,next)=>{
    let error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(500).json({status:false,err:error})
    }
    next()
}

const checkReplyId=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.get(`select userid from reply where replyid='${req.params.replyid}' and userid=${req.body.userid}`,(err,data)=>{
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else if(data){
                next()
            }
            else{
                return res.status(401).json({status:false,err:"Invalid User"})
            }
        })
    }
    catch(e){
        return res.status(500).json({status:false})
    }
}

module.exports={checkUserName,checkReplyId,checkThoughtId,validate};