import usermodel from "../models/usermodel.js";

const addcart = async (req, res) => {
  try {
    let userData=await usermodel.findOne({_id:req.body.userId});
    let cartdata= await userData.cartdata
    if(!cartdata[req.body.id]){
        cartdata[req.body.id]=1;
    }else{
        cartdata[req.body.id]+=1;
    }
    await usermodel.findOneAndUpdate(
        { _id: req.body.userId }, // Filter
        { $set: { cartdata } },   // Update
        { new: true }             // Option to return the modified document
      );
res.json({success:true,message:"added to cartitem"})
  } catch (error) {
    console.log(error);
    res.json({message:"error occur",sucess:false})
  }
};




const removecart = async (req, res) => {
    try {
        let userData=await usermodel.findOne({_id:req.body.userId});
        let cartdata= await userData.cartdata
        if(cartdata[req.body.itemId]>0){
            cartdata[req.body.itemId]-=1;
        }
        await usermodel.findOneAndUpdate(
            { _id: req.body.userId }, // Filter
            { $set: { cartdata } },   // Update
            { new: true }             // Option to return the modified document
          );
    res.json({success:true,message:"deleted from cartitem"})
      } catch (error) {
        console.log(error);
        res.json({message:"error occur",sucess:false})
      }
};





const listcart = async (req, res) => {
  try {
    let userData=await usermodel.findById({_id:req.body.userId});
    let cartdata= await userData.cartdata
    res.json({success:true,cartdata:cartdata})

  } catch (error) {
    console.log(error);
    res.json({message:"cart item is not fetching",sucess:false})
  }
};

export {addcart,removecart,listcart}
