const express = require("express")
const EmployeeController = require("../controller/EmployeeController")
const grandAccess = require("../middleware/grandAccess")
const upload=require("../middleware/uploadMiddleWare")


const router=express.Router()


router.post("/addEmployee",grandAccess("create","addEmployee"),async(request,response)=>{
    const res= await EmployeeController.addEmployee(request.body)
    response.json(res)
})

router.delete("/deleteEmployee/:_id",grandAccess("delete","addEmployee"), async(request,response)=>{
    const res = await EmployeeController.deleteEmployee(request.params._id)
    response.json(res)
})

router.put("/updateEmployee/:_id",async(request,response)=>{
   const res= await EmployeeController.employeeUpdate(request)
     response.json(res)
})


/**
 * @swagger
 * /singleData/:_id:
 *  get:
 *    summary : this api use for single data employee
 *    descirption : this api use for single data employee
 *    responses :
 *        200:
 *           description : this is the data extract
 * 
 */
router.get("/singleData/:_id",async(request,response)=>{  
    const res=await EmployeeController.singleData(request.body)
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