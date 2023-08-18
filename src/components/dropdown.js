import React from 'react';
import { Link } from 'react-router-dom';
import "./MenuItems.css";
const Dropdown = ({submenus, dropdown}) => {
  return (
    <div>
      <ul className ={dropdown ? "dropdown" : "hidden" }>
        {
          submenus.map((submenu, index) => (
            <li key={index} className="menu-items">
              <Link to={submenu.url}>{submenu.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default Dropdown;
