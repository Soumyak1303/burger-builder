import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem.js";
import "./NavigationItems.css";

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Auth</NavigationItem>
    </ul>
);

export default navigationItems;
