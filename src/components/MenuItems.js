import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './dropdown.js';
import { useState } from "react";
import "./MenuItems.css";
const MenuItems = ({items}) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div>
      <li className="menu-items">
        {
          items.submenu ? (
            <>
              <button type="button" onClick={() => setDropdown((prev) => !prev)}>
                {items.title}{' '}
              </button>
              <Dropdown submenus={items.submenu} dropdown={dropdown} />
            </>
          ) : (
            <Link to={items.url}>{items.title}</Link>
          )
        }
      </li>
    </div>
  );
};

export default MenuItems;

/*Code structure taken from https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/*/
