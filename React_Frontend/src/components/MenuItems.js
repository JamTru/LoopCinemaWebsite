import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './dropdown.js';
import { useState } from "react";
import './MenuItems.css';
const MenuItems = ({items}) => {
  const [display, setDisplay] = useState(false);//Simple logic to handle when to display the submenu. Initialised as false, onClick changes it.
  return (
    <div className="inline">
      <li className="menu-items">
        {
          items.submenu ? ( // Checks JSON file to see whether submenu category exists, if true display as button
            <div className="test-style">
              <button type="button" onClick={() =>  setDisplay((prev) => !prev)}>
                {items.title}{' '}
              </button>
              <Dropdown submenus={items.submenu} isShown={display} />
            </div>
          ) : (
            <Link className="LinkTo" to={items.url} style={{ textDecoration: 'none' }}>{items.title}</Link>
          )
        }
      </li>
    </div>
  );
};

export default MenuItems;

/*Code structure taken from https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/*/
