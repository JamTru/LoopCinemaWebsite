import React from 'react';
import menuItems from '../data/Navigation.json';
import MenuItems from './MenuItems.js';
import {Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../App.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul className="menu">
          {menuItems.menuItems.map((menu, index) => {
            return <MenuItems items={menu} key={index} />;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
