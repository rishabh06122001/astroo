const express=require ('express')
require('dotenv').config();
const mongoose=require('mongoose');
const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/astroCaptain');
        console.log('connected to Mongoose');
    } catch (error) {
        console.log("Mongoose error");
        error;
    }
}
connectDB();
const server=express();
const PORT=process.env.Server_Port || 3000

const userRoutes=require('./Routes/UserRoutes')
server.use('/api',userRoutes);


server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})