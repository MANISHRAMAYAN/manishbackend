require("../config/DB")
const collection=require("../config/Collection")
const mongoose = require("mongoose")

const employeeModel= new mongoose.Schema({

    employeeName:{type:String,required:[true,"name is required field"]},
    employeeEmail:{type:String,unique:[true,"name is already exists field"],required:[true,"email is required"]},
    employeeAge:{type:Number,required:[true,"age is required field"]}

})

   const employeeSchema=mongoose.model(collection.employee,employeeModel)
      module.exports=employeeSchema