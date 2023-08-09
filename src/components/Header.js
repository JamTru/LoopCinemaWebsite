import React from 'react'
import logo from '../movie.png'
const Header = () => {
  return (
    <div class="webHeader">
      <img src={logo} alt="logo" class="mainLogo"></img>
      <h1 id="brandName">Loop Cinemas</h1>
    </div>
  );
};

export default Header;
