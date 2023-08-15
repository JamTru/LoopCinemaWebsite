import React from 'react';
import {Container} from 'react-bootstrap';

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="#" >Home </a>
      <a href="#" >New Movies </a>
      <a href="#AboutUsContainer">About </a>
      <a href="#" class="right">Contact</a>
    </div>
  );
};

export default Navbar;
