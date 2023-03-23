require("../config/DB")
const collection= require("../config/Collection")
const mongoose=require("mongoose")
const roles=require("../../userRole")



const auth= new mongoose.Schema({

    name:{type:String,required:[true,"name is required field"]},
    email:{type:String,unique:[true,"name is already exists field"],required:[true,"email is required"]},
    password:{type:String,required:[true,"password is required"],minLength:3},
    role:{type:String,default:roles.user,enum:[roles.public,roles.admin,roles.user]}

})
const AuthUser=mongoose.model(collection.Auth, auth)

module.exports=AuthUser
