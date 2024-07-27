import express from 'express';
import { addfood, listfood, removefood } from '../controllers/foodcontroller.js';
import multer from 'multer';



const foodRouter=express.Router();

//image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:function(req,file,cb){
        cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload=multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addfood);
foodRouter.get("/list",listfood);
foodRouter.post("/remove",removefood);


export default foodRouter;
