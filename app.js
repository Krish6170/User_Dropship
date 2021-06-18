const express =require("express")
const app=express()
const userrouter=require("./router/userRouter")
const path= require("path")
const ejsmate=require("ejs-mate")
var methodOverride = require('method-override')
app.set("views",path.join(__dirname,"views"))
const {Apperr,wrapAsync}=require("./errors")
app.set("view engine","ejs")
app.engine("ejs",ejsmate)
app.use(express.static(path.join(__dirname,"public")))
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/User', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("connected")});
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use("/User",userrouter)

app.get("*",(req,res,next)=>{
    throw new Apperr("page not found",404)
})
app.use((err, req, res, next) => {
    const { status = 400 } = err;
    if (!err.message) {
      err.message = "something went wrong";
    }
    
   res.status(status).render("userview/error", { err });
    
  });
app.listen(5000,()=>{
console.log("listening...")
})
