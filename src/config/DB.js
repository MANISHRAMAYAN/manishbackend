require("dotenv").config({path:"../../.env"})


const mongoose= require("mongoose")

console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected");
},()=>{
    console.log("not connected");
})
