const {getToken}=require("../middleware/token")
const bcrypt=require("bcrypt")



const signUp=(req,res,next)=>{
    try{
        let salt=bcrypt.genSaltSync()
        req.body.password=bcrypt.hashSync(req.body.password,salt)
        let db=req.body.db;
        db.run(`insert into user (username,password) values('${req.body.username}','${req.body.password}')`,function(err){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                let token=getToken(this.lastID)
                if(token){
                    return res.status(200).json({status:true,token})
                }
                else{
                   return res.status(500).json({status:false})
                }
            }
        })
        db.close()
    }
    catch(e){
        return res.status(500).json({status:false})
    }
}

const login=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.get(`select userid,password from user where username='${req.body.username}'`,(err,data)=>{
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else if(!data){
                return res.status(401).json({status:false})
            }
            else{
                if(bcrypt.compareSync(req.body.password,data.password)){
                    let token=getToken(data.userid)
                    if(token){
                        return res.status(200).json({status:true,token})
                    }
                    else{
                    return res.status(500).json({status:false})
                }
                }
                else{
                    return res.status(401).json({status:false}) 
                }
                
            }
        })
        db.close()
    }
    catch(e){
        return res.status(500).json({status:false})
    }
}



module.exports={signUp,login};