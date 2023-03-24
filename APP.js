require("dotenv").config();
const express= require("express");
const authmiddleWare = require("./src/middleware/AuthMiddleware");
const a=require("./src/routes/AuthRoutes")
const cors=require("cors")
const employee=require("./src/routes/EmployeeRoutes");
const { PromiseProvider } = require("mongoose");
const grandAccess = require("./src/middleware/grandAccess");

const helmet=require("helmet")
const xss = require("xss-clean")
const rateLimmter=require("express-rate-limit")




const app=express();

app.use(cors())



// express.static(__dirname+'/public/')
app.use('/image',express.static(__dirname+'/public/upload/'))

app.use(express.json())


app.use("/auth",a)

app.use("/employee",authmiddleWare.verifyToken,employee)



module.exports=app;
