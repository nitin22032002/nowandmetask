const sqlite=require('sqlite3').verbose()

const openDb=(req,res,next)=>{
    try{
        let db=new sqlite.Database("./nowandmetask.db")
        req.body['db']=db;
        next()
    }
    catch(e){
        return res.status(500).json({status:false,err:"Database Error..."})
    }
}

module.exports=openDb;