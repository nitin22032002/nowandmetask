const addThought=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.run(`insert into thought (userid,thought,anonymous_status) values(${req.body.userid},${req.body.thought},${req.params.isAnonymous})`,function(err){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                return res.status(200).json({status:true,thoughtId:this.lastID});
            }

        })
    }
    catch(e){
        return res.status(500).json({status:false,err:e.message})
    }
}

const addReply=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.run(`insert into reply (userid,thoughtid,anonymous_status,reply_text) values(${req.body.userid},${req.params.thoughtid},${req.params.isAnonymous},${req.body.reply})`,function(err){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                return res.status(200).json({status:true,replytId:this.lastID});
            }

        })
    }
    catch(e){
        return res.status(500).json({status:false,err:e.message})
    }
}

const getAllThoughtAnonymous=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.all(`select thoughtid,thought from thought`,function(err,data){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                return res.status(200).json({status:true,thought:data});
            }

        })
    }
    catch(e){
        return res.status(500).json({status:false,err:e.message})
    }
}

const getAllThoughtItselfOrNon=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.all(`select thoughtid,thought,username from thought natural join user where userid=${req.body.userid} or anonymous_status=0`,function(err,data){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                return res.status(200).json({status:true,thought:data});
            }

        })
    }
    catch(e){
        return res.status(500).json({status:false,err:e.message})
    }
}

const getAllreplyAnonymous=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.all(`select reply_text,replyid,username from reply left join (select username,replyid as id from user natural join reply where thoughtid=${req.params.thoughtid} and userid=${req.body.userid} ) tem on tem.id=reply.replyid  where thoughtid=${req.params.thoughtid}`,function(err,data){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                return res.status(200).json({status:true,reply:data});
            }

        })
    }
    catch(e){
        return res.status(500).json({status:false,err:e.message})
    }
}


const deleteThought=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.run(`delete from thought where thoughtid=${req.params.thoughtid}`,function(err){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                return res.status(200).json({status:true});
            }

        })
    }
    catch(e){
        return res.status(500).json({status:false,err:e.message})
    }
}

const deleteReply=(req,res,next)=>{
    try{
        let db=req.body.db;
        db.run(`delete from reply where replyid=${req.params.replyid}`,function(err){
            if(err){
                return res.status(500).json({status:false,err:err.message})
            }
            else{
                return res.status(200).json({status:true});
            }

        })
    }
    catch(e){
        return res.status(500).json({status:false,err:e.message})
    }
}


module.exports={addThought,addReply,getAllThoughtAnonymous,getAllThoughtItselfOrNon,deleteThought,deleteReply,getAllreplyAnonymous}