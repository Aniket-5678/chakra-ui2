import mongoose from "mongoose";


const connectionDB = async() => {
try {
     const connectdb = await mongoose.connect(process.env.MONGOD_URI )
       
     console.log(`MONGODB connected to database successfully${connectdb.connection.host}`);

} catch (error) {
    console.log(`MONGODB connection failed`);
}





}


export default connectionDB