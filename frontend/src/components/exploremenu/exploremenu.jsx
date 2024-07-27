import React from "react";
import "./exploremenu.css";
import { menu_list } from "../../assets/assets";

const exploremenu = (props) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Explore a world of flavor with our curated menu. From savory classics to
        exotic delights, discover a world of flavors, from mouthwatering
        appetizers to delectable main courses and irresistible desserts. Whether
        you're craving classic comfort food, exotic international cuisine, or
        healthy options bursting with fresh ingredients, our menu has something
        for every palate.{" "}
      </p>
      <dev className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => {
                props.setCatagory((prev) => {
                  return prev === item.menu_name ? "all" : item.menu_name;
                });
              }}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={props.catagory === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </dev>
      <hr />
    </div>
  );
};

export default exploremenu;
