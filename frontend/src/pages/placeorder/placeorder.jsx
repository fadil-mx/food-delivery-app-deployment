import React, { useContext, useEffect, useState } from "react";
import "./placeorder.css";
import axios from "axios";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { gettotal, url, token, cartitem, food_list } = useContext(storeContext);
  const navigate=useNavigate();

  useEffect(() => {
    if (gettotal() === 0) {
      navigate("/cart");
      toast.warning("Cart is empty");
    }else if(!token){
      navigate("/cart");
      toast.warning("Please login to place an order")
    }
  },[])


  const [data, setdata] = useState({
    FullName: "",
    Lastname: "",
    Email: "",
    Street: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
    PhoneNumber: "",
  });


  const changehandler = (event) => {
    const { name, value } = event.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const placeorder = async (event) => {
    event.preventDefault();


    if (!token) {
      toast.error("Please login to place an order");
      return;
    }

    let orderitems = [];
    food_list.map((item)=>{
      if(cartitem[item._id]>0){
        let iteminfo=item;
        iteminfo["quantity"]=cartitem[item._id];
        orderitems.push(iteminfo)
      }
    })

    const orderdata = {
      items: orderitems,
      amount: gettotal() + 2,
      address: data,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderdata, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }else{
        alert("Error placing order")
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form className="place-order" onSubmit={placeorder}>
      <div className="delivery">
        <h2>Delivery Information</h2>
        <div className="delivery-address">
          <input required type="text" onChange={changehandler} name="FullName" value={data.FullName} placeholder="Full Name" />
          <input required type="text" onChange={changehandler} name="Lastname" value={data.Lastname} placeholder="Last name" />
          <input required type="email" onChange={changehandler} name="Email" value={data.Email} placeholder="Email" />
          <input required type="text" onChange={changehandler} name="Street" value={data.Street} placeholder="Street" />
          <input required type="text" onChange={changehandler} name="City" value={data.City} placeholder="City" />
          <input required type="text" onChange={changehandler} name="State" value={data.State} placeholder="State" />
          <input required type="text" onChange={changehandler} name="ZipCode" value={data.ZipCode} placeholder="Zip Code" />
          <input required type="text" onChange={changehandler} name="Country" value={data.Country} placeholder="Country" />
          <input required type="tel" onChange={changehandler} name="PhoneNumber" value={data.PhoneNumber} placeholder="Phone Number" />
        </div>
      </div>
      <div className="carttotal">
        <h2>Cart Totals</h2>
        <div className="leftdata">
          <div className="subtotals">
            <p>Subtotal</p>
            <p>${gettotal()}</p>
          </div>
          <hr />
          <div className="subtotals">
            <p>Delivery Fee</p>
            <p>${gettotal() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="subtotals total">
            <b>Total</b>
            <b>${gettotal() === 0 ? 0 : gettotal() + 2}</b>
          </div>
          <button type="submit" >PROCEED TO PAY</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;




