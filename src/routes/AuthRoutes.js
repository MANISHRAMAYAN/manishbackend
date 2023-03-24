

const express=require("express")
const authController=require("../controller/Authcontroller")
const EmployeeController = require("../controller/EmployeeController")
const { verifyToken } = require("../middleware/AuthMiddleware")



const router=express.Router()





router.post("/signup",  async(request,response)=>{
 const res =   await authController.signup(request.body)
 response.json(res)
})




router.post("/login",async(request,response)=>{
 const res=await authController.login(request.body)
 response.json(res)
})

router.post("/changepassword", verifyToken,async(request,response)=>{
 const res= await authController.changePassword(request.body)
 response.json(res)
})

router.post("/forgotpassword",async(request,response)=>{
    const res= await authController.forgetPassword()
    response.json(res)
})





module.exports=router