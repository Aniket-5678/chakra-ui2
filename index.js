import express from "express"
import dotenv from "dotenv"
import connectionDB from "./db/db.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import salesRoutes from "./routes/salesOrderRoutes.js"
import cors from "cors"
import path from "path"

 const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config()


//MONGODB connection
connectionDB()

const app = express()


app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "./client/build")));

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/customer', customerRoutes)
app.use('/api/v1/salesorder', salesRoutes )


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });




app.listen( process.env.PORT, ()=> {
    console.log(`server is running on PORT ${process.env.PORT}`);
})









