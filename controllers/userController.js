import userModel from "../models/user.model.js"
import { comparePassword, hashPassword } from "../helper/auth.js";
import JWT from "jsonwebtoken"


export const registerController = async(req, res) => {
 try {
    const {name, email, password} = req.body;
    
    // validation 
    if (!name) {
         return res.status(401).json({
            success: false,
            message: "Name is Required"
         })
    }

    if (!email) {
        return res.status(401).json({
           success: false,
           message: "email is Required"
        })
   }
   if (!password) {
    return res.status(401).json({
       success: false,
       message: "password is Required"
    })
}
  

  const existedUser = await userModel.findOne({email})

  if (existedUser) {
    return res.status(401).json({
      success: false,
      message: "user already Registerd"
    })
  }

  const hashed = await hashPassword(password)
 
 const user = await new userModel({
   name: name,
   email: email,
   password: hashed
 }).save()

 return res.status(200).json({
  success: true,
  message: "Registeration successfully",
  user
 })



 } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in Registeration"
    })
 }
}



export const loginController = async(req, res) => {
  try {
     
    const {email, password} = req.body;

    //validation 
    
    if (!email || !password) {
       return  res.status(401).json({
        success: false,
        message: "ALL fields are Required"
       })

    }

  const user = await userModel.findOne({email})
  if (!user) {
     return res.status(401).json({
      success: false,
       message: "user Not Registerd"
     })
  }

 const match = await comparePassword(password, user.password)
 if (!match) {
   return res.status(401).json({
    success: false,
    message: "Invalid password"
   })
 }
  const token = JWT.sign({_id : user._id} ,process.env.JWT_SECRET, {expiresIn: "7d"} )

  return res.status(200).json({
    success: true,
    message: "login successfully",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
  })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in Login"
    })
  }
}


export const testController = async(req ,res) => {

  res.send("protected Routes")

}