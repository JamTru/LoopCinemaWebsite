import React from 'react'
import logo from '../movie.png'
import { Link } from "react-router-dom"

const Header = () => {

  return (
    <div class="webHeader">
      <img src={logo} alt="logo" class="mainLogo"></img>
      <h1 id="brandName">Loop Cinemas</h1>
      <button type='button' className='login_button'>
        <Link to='../LoginForm.js' >
          Login
        </Link>
      </button>
    </div>
  );
};

export default Header;
