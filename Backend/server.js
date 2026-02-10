import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/FoodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'



// app config
const app = express()
const port = 4000

// middleware
app.use(express.json()) // request from frontened to backend will be parsed
app.use(cors())

// db connection
connectDB();

// api endpoints : u can upload img at http://localhost:4000/api/food/add
app.use("/api/food", foodRouter)

// to access image from uploads folder 
app.use("/image", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRoute)


app.get('/', (req,res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
})