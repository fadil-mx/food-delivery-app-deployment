import React, { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios' 
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const order = ({url}) => {

  const [order,setorder]=useState([])


  const fetchorder=async()=>{
    try {
      const response=await axios.get(url+"/api/order/list")
      if(response.data.success){
        setorder(response.data.order)
        // console.log(response.data.order)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("error occured in fetching orders")
    }
  }
 const statushandler=async(event,id)=>{
  try {
    const response = await axios.post(url+"/api/order/status",{orderid:id,status:event})
    if(response.data.success){
      await fetchorder();
    }
  } catch (error) {
    console.log(error);
    toast.error("error occured in updating"); 
  }
 }

  useEffect(()=>{
    async function fetching(){
      await fetchorder();
    };
    fetching();

  },[])

  return (
    <div className="order add">
       <h2>ORDER PAGE</h2> 
        <div className="order-list">
          {order.map((orders,index)=>{
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon}/>  
              <div>
                <p className='order-item-food'>{orders.items.map((item,index)=>{
                if(index===orders.items.length-1){

                  return  item.name+" x "+item.quantity
                  
                }else{

                 return  item.name +" x "+item.quantity+", "
                }
                })}</p>
                <p className="order-item-name">{`${orders.address.FullName} ${orders.address.Lastname}`}</p>
                <div className='order-item-address'>
                  <p>{orders.address.Street+","}</p>
                <p>{`${orders.address.City} ,${orders.address.State} ,${orders.address.ZipCode} ,${orders.address.Country}`}</p>
                </div>
                <p className='oder-item-phone'>{orders.address.PhoneNumber}</p>
              </div>
              <p>Items : {orders.items.length}</p>
              <p>{order.amount}</p>
              <select onChange={(event)=>{
                const eventoccure=event.target.value;
                statushandler(eventoccure,orders._id)
              }} value={orders.status}>
                <option value="Food processing">Food processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Deleverd">Deleverd</option>
              </select>
            </div> 
          )
          })}
        </div>
    </div>
  )
}


export default order

