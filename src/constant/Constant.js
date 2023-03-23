const bcrypt=require("bcryptjs")


module.exports={


getHashPassword(singUpObj){

  const salt=bcrypt.genSaltSync(10)
     
         singUpObj.password   =  bcrypt.hashSync(singUpObj.password,salt)
          return singUpObj
},

// getHashPassword(signupData)

comparePassword(password,hash){
      return bcrypt.compareSync(password,hash)

},


expreTokenTime(){
      

}



}