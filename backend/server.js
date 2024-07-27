import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodroute.js';
import userrouter from './routes/userroute.js';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import cartrouter from './routes/cartroute.js';
import orderRouter from './routes/orderrouter.js';




const app=express();

const port=process.env.PORT || 3000;

//middleware
app.use(express.json());
  // const allowedOrigins = [
  //   'http://localhost:5173', 
  //   'http://localhost:5174' 
  // ];
  app.use(cors({
    origin: "*",
    credentials: true // This allows cookies to be sent and received
  }));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


connectDB();

//api endpoint
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userrouter)
app.use("/api/cart",cartrouter)
app.use("/api/order",orderRouter)




app.get("/",(req,res)=>{
    res.send('server is ready');
})




app.listen(port,()=>{
    console.log('server started at 3000');
})

//mongodb+srv://admin-fadil:<password>@cluster0.u3bs9zf.mongodb.net/?
