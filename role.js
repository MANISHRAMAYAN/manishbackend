const AccessControl=require("accesscontrol")
const user_Type= require("./userRole")

const ac = new AccessControl()

module.exports.roles=(function(){
    ac.grant(user_Type.public).readAny("addEmployee")
    ac.grant(user_Type.user).extend(user_Type.public).create("addEmployee").updateOwn("addEmployee")
    ac.grant(user_Type.admin).extend(user_Type.user).extend(user_Type.public).deleteAny("addEmployee").deleteAny("profile")
   
    return ac;
})()