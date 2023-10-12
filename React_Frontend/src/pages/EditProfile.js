import React from 'react';
import profilePic from '../profilePic.png'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateVerify} from "../data/repository"

function EditProfile(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(props.email)
  const [username, setUsername] = useState(props.username)
  
  
  console.log(props)
  
  return (
    <>
    <form onSubmit={event => {
      event.preventDefault();
      console.log("Email:", email);
      console.log("Username:", username);
      console.log("Password: ", props.password)
      console.log(props.email, props.username);

      // updateVerify(props.email, email, username, props.password, props.date);


      console.log("(1)UPDATE USERNAME : " + props.username + " => " + username)

      const setUpdate = updateVerify(props.username, username, email);
      // updateVerify()
      // props.loginUser(email, username, props.password, props.date);
      console.log("(2)setUpdate Value : " + JSON.stringify(setUpdate))

      props.loginUser(setUpdate.email, setUpdate.username, setUpdate.passwordHash, setUpdate.createdTimeStamp)

      console.log("(3)Upaded user info : " + JSON.stringify(setUpdate))
      
      navigate('/Profile.js')
    }}>
      <div className="form-group">
        <div className="profile_box">
          <div className="profile_title">
            <label htmlFor="Profile" className="control-profile-label">Profile</label>
          </div>
          <div>
            <div className="profile_body">
              <img src={profilePic} className="profilePic" alt ="profilePic"></img>

              <input 
                type="text" 
                className="profile_body_username" 
                placeholder={props.username}
                value={username} 
                onChange={event => setUsername(event.target.value)
              }/>
              
              <input 
                type="email"
                className="profile_body_email" 
                placeholder={props.email}
                value={email} 
                onChange={event => setEmail(event.target.value)
              }/>
              
              <input className="editButton" type="submit" value="Edit"></input>
            </div>
          </div>
          <div className="profile_footer">
              <hr></hr>
              <label>{props.date}</label>
          </div>
        </div>
      </div>
    </form>
    </>    
  )
}
export default EditProfile;
