import React, { useEffect } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const add = () => {
  const url = "https://food-delivery-backend-slp5.onrender.com";
  const [image, setImage] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "salad",
  });
  const onchangehandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //  useEffect(()=>{console.log(data)},[data])
  const onsubmithandler = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("price", Number(data.price));
    formdata.append("category", data.category);
    formdata.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formdata);
    console.log(response);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(false);
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form action="" className="flex-col" onSubmit={onsubmithandler}>
        <div className="add-img flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onchangehandler}
            value={data.name}
            type="text"
            name="name"
            id="product"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Discription</p>
          <textarea
            onChange={onchangehandler}
            value={data.description}
            name="description"
            id="description"
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>
        <div className="add-category-price ">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onchangehandler} name="category" id="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onchangehandler}
              value={data.price}
              type="number"
              name="price"
              id="price"
              placeholder="$"
            />
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default add;
