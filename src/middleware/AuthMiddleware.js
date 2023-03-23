require("dotenv").config({path:'./../../.env'})
const jwt=require("jsonwebtoken")
module.exports={


    verifyToken(request,response,next){
        try {
        const secretToken =  process.env.JWT_SECRET_KEY
        const token=request.headers["authorization"].split(" ")[1]
           const verify = jwt.verify(token,secretToken)
           console.log(verify);

           if(verify){
            request.body._id= verify._id,
            request.body.name=verify.name,
            request.body.email=verify.email,
            request.role=verify.role
            next()
           }
           else{
            response.status(401).json({status:"failed",message:"unauthorized ! acess acess token expries"})
           }
  
            
        } catch (error) {
            response.status(401).json({status:"failed",message:"unauthorized ! acess acess token expries"})
            
        }
    }
}