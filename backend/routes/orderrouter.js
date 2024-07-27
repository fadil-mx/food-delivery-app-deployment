import express from "express"
import placeorder, { listorder, updateorder, userorder, verifyorder } from "../controllers/ordercontroller.js";
import authenticateToken from "../middleware/auth.js";

const orderRouter=express.Router();


orderRouter.post("/place",authenticateToken,placeorder);
orderRouter.post("/verify",verifyorder)
orderRouter.post("/userorder",authenticateToken,userorder)   
orderRouter.get("/list",listorder) 
 orderRouter.post("/status",updateorder)

export default orderRouter