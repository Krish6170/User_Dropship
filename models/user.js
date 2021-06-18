const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  phone:{
    type:Number,
    
    
    required:true

  }

 
});

const User= mongoose.model("User",Schema)

module.exports=User