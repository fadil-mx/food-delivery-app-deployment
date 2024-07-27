import express from "express"
import { addcart,removecart,listcart } from "../controllers/cartcontroller.js";
import authenticateToken from "../middleware/auth.js";

const cartrouter=express.Router();

cartrouter.post("/add",authenticateToken,addcart);
cartrouter.post("/remove",authenticateToken,removecart);
cartrouter.post("/get",authenticateToken,listcart)

export default cartrouter;