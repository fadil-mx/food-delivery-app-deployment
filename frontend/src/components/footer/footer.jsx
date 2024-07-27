import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";

const footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Our company is dedicated to providing delicious and satisfying meals
            to our customers, delivered with convenience and reliability. With a
            passion for culinary excellence, we strive to offer a diverse menu
            of high-quality dishes made from fresh ingredients.{" "}
          </p>
          <div className="footer-content-left-logo">
            <img src={assets.facebook_icon} alt="error" />
            <img src={assets.twitter_icon} alt="error" />
            <img src={assets.linkedin_icon} alt="error" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 958741591</li>
            <li>mxfoody@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> copyright 2024 @ mx.com</p>
    </div>
  );
};

export default footer;
