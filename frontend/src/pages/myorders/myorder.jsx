import React, { useContext, useEffect, useState } from 'react';
import './myorder.css';
import { storeContext } from '../../context/storeContext';
import axios from 'axios';
import {assets} from '../../assets/assets';

const myorder = () => {
  const { url, token } = useContext(storeContext);
  const [orderdata, setOrderdata] = useState([]);

  const getOrder = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorder", {}, { headers: { token } });
      if (response.data.success === true) {
        setOrderdata(response.data.order);
        // console.log(response.data.order);
      } else {
        alert("Error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getOrder();
    }
  }, [token]);

    return (
    <div className='my-order'>
        <h2>MY ORDERS</h2>
        <div className="container">
            {orderdata.map((order,index)=>{
                return(
                    <div className='my-orders-order' key={index}>
                        <img src={assets.parcel_icon}/>
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                return( item.name+" x "+item.quantity)
                            }else{
                                return( item.name+" x "+item.quantity+", ")
                            }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>items:{order.items.length}</p>
                        <p><span >&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={ getOrder} >Track order</button>

                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default myorder
