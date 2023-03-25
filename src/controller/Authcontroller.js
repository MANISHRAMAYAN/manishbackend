const authUser = require("../model/Authmodel")
const bcrypt=require("bcryptjs")
const { getHashPassword, comparePassword } = require("../constant/Constant")
const jwt=require("jsonwebtoken")

require("dotenv").config({path:"../../.env"})

module.exports={
    
    async signup(signupData){
        console.log("manish");
        const response={}
        try {
            const singupObj=getHashPassword(signupData)

            const res= await new authUser(singupObj).save();  //.save is method to equality to insert
            if(res){
                response.status="success",
                response.message="singup successfully"
            }
            else{
                response.status="falied"
            }
        } catch (error) {
            response.status="falied",
            response.message="Alerady exists"
        }
        return response;
    },

    //login system code 



    async login(loginData){
        const response={}          
           try {
        
            const res= await authUser.findOne({email:loginData.email},{name:1,password:1,_id:1,email:1,role:1})
           
           

         const isPass =   comparePassword(loginData.password,res.password)
            // console.log(res);
            if(isPass){
                var tokenData={
                    _id:res._id,
                    name:res.name,
                    email:res.email,
                    role:res.role,
                }
                const secretKey=process.env.JWT_SECRET_KEY
                // console.log(secretKey);

                
                const token= jwt.sign(tokenData,secretKey,{expiresIn:"30d"})
                response.status="success",
                response.message="login sucessfully",
                response.data=res.name
                response.token=token
                // token 
            }
            else{
                response.status="falied",
                response.message="Invaild email and password"
            }
           } catch (error) {
            response.status="falied",
            response.message="enter email and password"
           }
           return response
    },

  


    async changePassword(updateData){     
        console.log(updateData);
        const response={}
        try {
 

         const dbHash = await authUser.findOne({_id:updateData._id},{password:1})
         
            if(comparePassword(updateData.old_password , dbHash.password)){
                console.log("hello");

                const query={
                    _id:updateData._id,
                    email:updateData.email
                }    

             const new_pass = getHashPassword(updateData)
             console.log(new_pass);
            
             const res = await authUser.updateOne(query,{$set:{password:new_pass.password}})        
             console.log(res,new_pass)

             if(res.modifiedCount==1){               
                response.status="success"
                console.log("hellopass");
                response.message="password change successfully"
             }
           }
           else{
            response.status="falied"
            response.message="incorrect password"
           }
        } catch (error) {
            response.status="falied"
            response.message="something worong"
        }
        return response
    }
  

}