import express from 'express'
import cors from 'cors'
import { connectDB } from '../config/db.js'
import foodRouter from '../routes/FoodRoute.js'
import userRouter from '../routes/userRoute.js'
import cartRouter from '../routes/cartRoute.js'
import orderRoute from '../routes/orderRoute.js'
import 'dotenv/config'

// app config
const app = express()

// middleware
app.use(express.json())

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://naanstop-one.vercel.app/"
  ],
  credentials: true
}))

// db connection
connectDB()

// routes
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRoute)

// static folder
app.use("/image", express.static('uploads'))

// test route
app.get('/', (req,res)=>{
  res.send("API working 🚀")
})


export default app