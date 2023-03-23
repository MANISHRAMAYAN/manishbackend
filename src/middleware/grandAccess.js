const user_Type=require("../../userRole")
const {roles}=require("../../role")


const grandAccess=(action,resourse)=>{
    return async (request,response,next)=>{

     const role  = request.role ? request.role:user_Type.public;
     console.log(role);
     const permission= await roles.can(role)[action](resourse)
     if(!permission.granted){
        next(response.status(403).json("you do not permisson"))
     }
    //  console.log(role);
     next()

    }

}
module.exports=grandAccess