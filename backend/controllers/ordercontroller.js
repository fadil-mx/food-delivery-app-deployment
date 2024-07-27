import ordermodel from "../models/oredermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from "stripe";

const stripe=new Stripe(process.env.STRIP_SECRET_KEY)
const placeorder = async (req, res) => {
    try {
      // Creating a new order instance with the provided data
      const neworder = new ordermodel({
        userid: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
      });
  
      // Creating line items for the Stripe checkout session
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100 * 80,
        },
        quantity: item.quantity,
      }));
  
      // Creating a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `http://localhost:5174/verify?success=true&orderid=${neworder._id}`,
        cancel_url: `http://localhost:5174/verify?success=false&orderid=${neworder._id}`,
      });
  
      // Sending the session URL to the client
      res.json({ success: true, session_url: session.url });
      
      // Adding delivery charges to the line items
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "delivery charges",
          },
          unit_amount: 2 * 100 * 80,
        },
        quantity: 1,
      });
  
      // Saving the new order to the database
      await neworder.save();
  
      // Clearing the user's cart after order is placed
      await usermodel.findByIdAndUpdate(
        { _id: req.body.userId },
        { $set: { cartdata: {} } },
        { new: true }
      );
    } catch (error) {
      // Handling errors
      console.log(error);
      res.json({ success: false, message: "Error occurred" });
    }
  };
const  verifyorder=async(req,res)=>{

  const{orderid,success}=req.body;
  try {
    if(success==="true"){
      await ordermodel.findByIdAndUpdate({_id:orderid},{$set:{payment:true}})
      res.json({success:true,message:"orderplaced successfully"})
    }else{
      await ordermodel.findByIdAndDelete({_id:orderid});
      res.json({success:false,message:"payment failed"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error occured in payment"})
  }
}
  //userorder for frount end
const userorder=async(req,res)=>{
  try {
    const order=await ordermodel.find({userid:req.body.userId});
    res.json({success:true,order:order})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error occured in fetching"});
  }
}

//listing all orders for admin pannel

const listorder=async(req,res)=>{
 try {
  const order=await ordermodel.find({});
  res.json({success:true,order:order})
 } catch (error) {
  console.log(error);
  res.json({success:false,message:"error occured in fetching order"});
 }
}

//api for udpating order status
const  updateorder=async(req,res)=>{
  try {
    await ordermodel.findByIdAndUpdate({_id:req.body.orderid},{$set:{status:req.body.status}})
    res.json({success:true,message:"order status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error occured in updating order status"})
  }
}


export {verifyorder,userorder,listorder,updateorder}
export default placeorder;
  