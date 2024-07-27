import express from 'express';
import { cookiedelete, loginuser, registeruser } from '../controllers/usercontroller.js';

const userrouter = express.Router();


userrouter.post("/register",registeruser )
userrouter.post("/login",loginuser )
userrouter.post('/logout',cookiedelete)


export default userrouter;