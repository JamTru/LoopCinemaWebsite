import React from 'react';
import { Link } from 'react-router-dom';
const Dropdown = ({submenus, isShown}) => {
  if(!isShown){
    return; //If the isShown is false, return nothing as a component
  } else {
    return (
      <div>
        <ul className="menu-open">
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
}
export default Dropdown;
