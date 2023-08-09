import React from 'react'
import logo from '../movie.png'
const Header = () => {
  return (
    <div class="webHeader">
      <h1 id="brandName">Loop Cinemas</h1>
        <img src={logo} alt="logo" class="mainLogo"></img>
    </div>
  );
};
  
export default Header;