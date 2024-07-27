import React, { useContext } from "react";
import "./fooditem.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/storeContext";

const fooditem = ({ itemId, name, price, description, image }) => {
  const { cartitem, addCart, removeCart,url } = useContext(storeContext);

  return (
    <div>
      <div className="food-item"> 
        <div className="food-item-container">
          <img className="food-item-image" alt="food" src={url+"/images/"+image} />
          {!cartitem[itemId] ? (
            <img
              className="add"
              onClick={() => addCart(itemId)}
              src={assets.add_icon_white}
            />
          ) : (
            <div className="count">
              <img
                onClick={() => removeCart(itemId)}
                src={assets.remove_icon_red}
              />
              <p>{cartitem[itemId]}</p>
              <img
                onClick={() => addCart(itemId)}
                src={assets.add_icon_green}
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img alt="rating" src={assets.rating_starts} />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default fooditem;
