import React, { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";

const cart = () => {
  const { cartitem, food_list, removeCart, gettotal,url } =useContext(storeContext);
  const navigate = useNavigate();
  return (
    <div>
      <div className="cart">
        <div className="cart-item">
          <div className="cart-item-title">
            <p>Item</p>
            <p>title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartitem[item._id] > 0) {
              return (
                <div>
                  <div className="cart-item-title cart-item-item">
                    <img src={`${url}/images/${item.image}`} alt="food" />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartitem[item._id]}</p>
                    <p>{item.price * cartitem[item._id]}</p>
                    <p
                      onClick={() => {
                        removeCart(item._id);
                      }}
                      className="cross"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${gettotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>delevery Fee</p>
              <p>${gettotal()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <b>Total</b>
            <b>${gettotal()===0?0:gettotal() + 2}</b>
            </div>
          </div>
          <button 
            onClick={() => {
              navigate("/order");
            }}
          >
            Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <h2>Apply Promo Code</h2>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter Promo Code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
