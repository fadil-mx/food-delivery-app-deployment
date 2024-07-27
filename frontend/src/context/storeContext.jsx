import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";//now we dont need athe database we create now we can use the mongodb
import axios from "axios";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setfood_list] = useState([]);
  const [cartitem, setcartitems] = useState({});
  const url = "https://food-delivery-app-backend-kwz5.onrender.com";
  const [token, settoken] = useState("");

  const addCart = async (id) => {
    if (!cartitem[id]) {
      setcartitems((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setcartitems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { id }, { headers: { token } });
    }
  };

  const removeCart = async (id) => {
    setcartitems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId: id },
        { headers: { token } }
      );
    }
  };

  // useEffect(() => {
  //   console.log(cartitem);
  // },[cartitem]);


  const gettotal = () => {
    let total = 0;
    for (let item in cartitem) {
      if (cartitem[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item);
        total += iteminfo.price * cartitem[item];
      }
    }
    return total;
  };

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        withCredentials: true,
      });
      setfood_list(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //     settoken(localStorage.getItem("token"))
  //   }
  //   fetchlist()
  // }, [])

  const loadCartdata=async(token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setcartitems(response.data.cartdata)
  }

  useEffect(() => {
    async function loaddata() {
      await fetchlist();
      if (localStorage.getItem("token")) {
        settoken(localStorage.getItem("token"));
        await loadCartdata(localStorage.getItem("token"))
      }
    }
    loaddata();
  }, []);

  const ContextValue = {
    food_list,
    cartitem,
    setcartitems,
    addCart,
    removeCart,
    gettotal,
    url,
    token,
    settoken,
  };

  return (
    <storeContext.Provider value={ContextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
