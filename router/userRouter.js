const express =require('express')
const { wrapAsync, Apperr } = require('../errors')
const router=express.Router()
const User=require("../models/user")


//new
router.get("/new",(req,res,next)=>{
    
    res.render("userview/newuser.ejs")
})
router.post("/",wrapAsync(async(req,res,next)=>{
    const z=await User(req.body.user_info)
    z.save()
   
  res.redirect("/User")
}))
//allUser
router.get("/",wrapAsync(async(req,res,next)=>{
   const users =await User.find({})
   
  res.render("userview/alluser",{users})
}))
//show details
router.get("/:id",wrapAsync(async(req,res,next)=>{
    const {id}=req.params
    const details =await User.findById(id)
    if(!details){
      throw new Apperr("user not found",404)
    }
     res.render("userview/show",{details})
 }))

//update course
router.get("/:id/edit",wrapAsync(async(req,res,next)=>{
    const {id}=req.params
    const details =await User.findById(id)
    if(!details){
      throw new Apperr("user not found",404)
    }
     res.render("userview/edit",{details})
 }))
router.put("/:id",wrapAsync(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
   await User.findByIdAndUpdate(id,req.body.user_info,{runValidators:true})
 
    res.redirect(`/User/${id}`)
 }))
//delete
router.delete("/:id",wrapAsync(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
   await User.findByIdAndDelete(id)
    
   res.redirect("/User")
 }))


module.exports=router