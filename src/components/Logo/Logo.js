import React from "react";
import BurgerLogo from "../../assets/Images/logo.png";
import "./Logo.css";

const logo = (props) => (
  <div className="Logo" style={{ height: props.height }}>
    <img src={BurgerLogo} alt="BurgerLogo" />
  </div>
);

export default logo;
