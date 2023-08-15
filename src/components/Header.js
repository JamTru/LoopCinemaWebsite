import React, { useState } from "react"
import logo from '../movie.png'
import SignUpModal from "../modals/SignUpModal";
import SignInModal from "../modals/SignInModal";

const Header = () => {
  const [signUpModalOn, setSignUpModalOn] = useState(false);
  const [signInModalOn, setSignInModalOn] = useState(false);

  return (
    <>
      <SignUpModal 
        show={signUpModalOn}
        onHide={ ()=> setSignUpModalOn(false)} 
      />
      <SignInModal
        show={signInModalOn}
        onHide={ () => setSignInModalOn(false)}
      />
      
      {/* show prop allows user to see the modal */}
      {/* onHide is to hide the modal */}
    
      <div class="webHeader">
        <img src={logo} alt="logo" class="mainLogo"></img>
        <h1 id="brandName">Loop Cinemas</h1>
        
        <button type="button" className='signUp_button' onClick={ ()=> setSignUpModalOn(true)}>
          Sign Up
        </button>
        
        <button type="button" className='signIn_button' onClick={ ()=> setSignInModalOn(true)}> 
          Sign In
        </button>
        
      </div>
    </>
  );
};

export default Header;
