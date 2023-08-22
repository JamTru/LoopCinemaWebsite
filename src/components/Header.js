import React, { useState } from "react"
import logo from '../movie.png'
import SignUpModal from "../modals/SignUpModal";
import SignInModal from "../modals/SignInModal";
import App from '../App'
import { Link } from "react-router-dom";

function Header(props) {
  const [signUpModalOn, setSignUpModalOn] = useState(false);
  const [signInModalOn, setSignInModalOn] = useState(false);
  const [loginUser, setloginUser] = useState(false);
  const [logoutUser, setlogoutUser] = useState(false);
  // const [username, setUsername] = useState(props.username)
  // const [signInUser, setSignInUser] = useState(App.getUser);
  const test = () => {

    // to Check loginUser is in props
    if ("loginUser" in props) {
      // we have loginUser
      console.log("We have that in props in Header")
    } else {
        console.log("loginUser wasn't in props!")
        console.log(props)
    }

  }
  return (
    <>
       
      
      <SignUpModal 
        show={signUpModalOn}
        setloginUser={props.loginUser}
        setlogoutUser={props.logoutUser}
        onHide={ ()=> setSignUpModalOn(false)}

         
      />
      <SignInModal
        show={signInModalOn}
        setloginUser = {props.loginUser}
        // setloginUser = {props.username}
        setlogioutUser = {props.logoutUser}
        onHide={ () => setSignInModalOn(false)}
        
        // setUsername = {props.username}
      />

      {/* show prop allows user to see the modal */}
      {/* onHide is to hide the modal */}

        
      <ul className="webHeader">
        <img src={logo} alt="logo" class="mainLogo"></img>
        <h1 id="brandName">Loop Cinemas</h1>
        {props.email === null ? //if Email doesn't exsit shwoing SignIn/Out
          <>
            <li className="header-item">
              <button type="button" className='signUp_button' onClick={ ()=> setSignUpModalOn(true)}>
                Sign Up
              </button>
              
            </li >
            <li className="header-item">
              {/* <Link to="/modals/SignInModal"> */}{/* </Link> */}
              <button type="button" className='signIn_button' onClick={ ()=> setSignInModalOn(true)}> 
                Sign In
              </button>
              {/* <Link className="header-link" to="/modals/SignInModal" /> */}
            </li>
          </>  
          :
          // OR if the user exsits showing wlecome message
          <> 
            <li className="header-item">
              <span className="nav-link text-light">Welcome, {props.username}</span>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
            </li> */}
            <Link to="/">
              <button type="button" className='signOut_button' onClick={ props.logoutUser}> 
                Sign Out
              </button>
            </Link>  
          </>
        }
      </ul>
    </>
  );
};

export default Header;
