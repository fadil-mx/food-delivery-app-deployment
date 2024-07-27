import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:3000";
  const [list, setList] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`,);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])


  const deletelist=async(foodid)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodid});
    await fetchData();
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
   };
  

  return (
    <div>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format ">
              <img  src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="curser" onClick={()=>{deletelist(item._id)}}>x</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
