import Foodmodel from "../models/foodmodel.js";
import fs from "fs";

const addfood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new Foodmodel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "food added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "failed to add food" });
  }
};

const listfood = async (req, res) => {
  try {
    const foods = await Foodmodel.find();
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "failed to get food list" });
  }
};

const removefood = async (req, res) => {
  try {
    const food=await Foodmodel.findById(req.body.id);


     fs.unlink(`/uploads/${food.image}`,()=>{});

     
    await Foodmodel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "food deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "failed to delete food" });
  }
};

export { addfood, listfood ,removefood};
