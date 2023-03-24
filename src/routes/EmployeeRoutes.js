const express = require("express")
const EmployeeController = require("../controller/EmployeeController")
const grandAccess = require("../middleware/grandAccess")
const upload=require("../middleware/uploadMiddleWare")


const router=express.Router()
// grandAccess("create","addEmployee"),

router.post("/addEmployee",async(request,response)=>{
    const res= await EmployeeController.addEmployee(request.body)
    response.json(res)
})
//  grandAccess("delete","addEmployee"),

router.delete("/deleteEmployee/:_id", async(request,response)=>{
    const res = await EmployeeController.deleteEmployee(request.params._id)
    response.json(res)
})

router.put("/updateEmployee/:_id",async(request,response)=>{
   const res= await EmployeeController.employeeUpdate(request)
     response.json(res)
})



router.get("/singleData/:_id",async(request,response)=>{  
    const res=await EmployeeController.singleData(request)
    response.json(res)
})


router.get("/allData",async(request,response)=>{
    const page=request.query.page

    const res = await EmployeeController.getAllData(page)
    response.json(res)
})

router.post("/upload",upload.single('image'),async(request,response)=>{
    console.log(request.body);
    const body=request.body
    body.imagePath=request.imagePath
    response.json({message:"successfully"})
})


module.exports=router