const express=require("express")
const router=express.Router()
const {signUp, login}=require("./apis_Functions/users");
const openDb = require("./database/db");
const {verifyToken}=require("./middleware/token")
const {checkUserName,checkReplyId,checkThoughtId,validate}=require("./middleware/validation")
const {body}=require("express-validator")
const {addThought,addReply,getAllThoughtAnonymous,getAllThoughtItselfOrNon,deleteThought,deleteReply, getAllreplyAnonymous}=require("./apis_Functions/thoughts")

router.post("/signup",openDb,[body("username","User Length Must lie b/w 2-25").isLength({min:2,max:25}),body("password",'Password Length Must lie b/w 8-25').isLength({min:8,max:25})],validate,checkUserName,signUp);

router.post("/login",openDb,[body("username",'User Length Must lie b/w 2-25').isLength({min:2,max:25}),body("password",'Password Length Must lie b/w 8-25').isLength({min:8,max:25})],validate,login);

router.post("/addthought/:isAnonymous",verifyToken,openDb,[body("thought",'Thought Length Must greater then 5').isLength({min:5})],validate,addThought);

router.post("/addreply/:isAnonymous/:thoughtid",verifyToken,openDb,[body("reply",'Reply Length Must Greater then 5').isLength({min:5})],validate,checkThoughtId,addReply);

router.get("/getallthought/1",verifyToken,openDb,getAllThoughtAnonymous);

router.get("/getallthought/0",verifyToken,openDb,getAllThoughtItselfOrNon)

router.get("/getallreply/:thoughtid",verifyToken,openDb,getAllreplyAnonymous)

router.delete("/deletereply/:replyid",verifyToken,openDb,checkReplyId,deleteReply);

router.delete("/deletethought/:thoughtid",verifyToken,openDb,checkThoughtId,deleteThought);

module.exports=router;