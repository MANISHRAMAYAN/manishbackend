const { ObjectID } = require("bson");
const { employee } = require("../config/Collection")
const employeeModel=require("../model/EmployeeModel")



module.exports={

    async addEmployee(addData){
       
       
     
       
        const response={}
        
        const add=new employeeModel ({
        employeeName : addData.employeeName,
        employeeEmail: addData.employeeEmail,
        employeeAge: addData.employeeAge
        }  )

        try {
            const saveEmployeeData=await add.save()
            if(saveEmployeeData){
                response.status="success",
                response.message="addemployee sucessfully"
            }
            else{
                response.status="failed",
                response.message="not add"
            }
        } catch (error) {
            response.status="falied",
            response.message="something wrong "
            
        }
        return response
    },
    async deleteEmployee(deleteData){
        const response={}
        console.log(deleteData);
        try {
            const res=  await employeeModel.deleteOne({deleteData})
            console.log(res);
            if(res){
              response.status="success",
              response.message="sucessfully deleted"
            }
            else{
              response.status="falied",
              response.message="employee data can't delete"
            }
            
        } catch (error) {
            console.log(error);
        }
     return response
       
    },

    async employeeUpdate(updateData){   
        const response ={}     
          try {
            const {employeeName,employeeEmail,employeeAge} = updateData.body
            console.log(employeeName);

            const update= await employeeModel.findOneAndUpdate({_id:updateData.params._id},{employeeName:employeeName,employeeEmail:employeeEmail,employeeAge:employeeAge})
           
         if(update){
            response.status="success",
            response.message="add succesfully data",
            response.data={employeeName,employeeEmail,employeeAge}
         }
            
          } catch (error) {
                response.status="falied",
                response.message="someting wrong"
          }
          return response

    },
    async singleData(data){
        console.log("hello");
        console.log(data);
        const id= data.params._id
        console.log(id);
    const response={}
        
        try {
            const single = await employeeModel.findOne({_id:ObjectID(data.params._id)},{employeeName:1,employeeAge:1,employeeEmail:1,_id:1})
            if(single){
                response.status="success",
                response.message="get single employee data"
                response.data=single
            }
            else{
                response.status="falied",
                response.message="can't get employee single data"
            }
        } catch (error) {
            response.status="falied",
            response.message="someting wrong"
            
        }
        return response

    },

    async getAllData(curPage){
       const response={}
       const limit=1;
       const count= await employeeModel.find().count()      
       const totalPage=Math.ceil(count/limit)

       response.totalPage=totalPage
       if(curPage >=1 && curPage<=totalPage){
        const skip=(curPage-1)*limit
       

        try {
            const all= await employeeModel.find().skip(skip).limit(limit)
            if(all){
                response.status="success",
                response.message="Get all employee data "
                response.data=all
            }
            else{
                response.status="falied",
                response.message="can't Get all employee data "

            }
        } catch (error) {
            response.status="falied",
                response.message="Something wrong plesae check mongo db commend"
        }
    }
    else{
        response.status="failed",
        response.message="page not found"
    }
        return response
 },

  async forgetPassword(){



   }


   
}