import mongoose from "mongoose";



export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin-fadil:fadil@cluster0.u3bs9zf.mongodb.net/food-del");
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
  }
};
