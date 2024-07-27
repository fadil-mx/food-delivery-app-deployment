import React from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";

const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon}/>
          <p>Add items</p>
        </NavLink>
       <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon}/>
          <p>List items</p>
        </NavLink>
        <NavLink to="/order" className="sidebar-option">
          <img src={assets.order_icon}/>
          <p>Order items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default sidebar;
