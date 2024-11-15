import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://kumarisakshi900600:9006005042@cluster0.wyzi0yj.mongodb.net/Food-Delivery').then(()=>console.log('DB connected'))
    
}