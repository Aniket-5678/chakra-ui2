import bcrypt from "bcrypt"




export const  hashPassword = async(password) => {
try {
      const saltRounds = 10;

      const hashed = await  bcrypt.hash(password, saltRounds) 
      
      return hashed

} catch (error) {
    console.log(error);
}


}


export const comparePassword = async(password, hashed) => {
    try {
       const comparePass = await bcrypt.hash(password, hashed)
         
       return comparePass

    } catch (error) {
        console.log(error);
    }
}