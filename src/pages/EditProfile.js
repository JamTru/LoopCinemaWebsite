import React from 'react';
import profilePic from '../profilePic.png'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ReviewFormModal(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(props.email)
  const [username, setUsername] = useState(props.username)
  
  
  return (
    <>
    <form onSubmit={event => {
      event.preventDefault();
      const email = event.target.value;
      const username = event.target.value;
      console.log(">>>>>> " + props.email + " " + props.username + " " + props.date)
      console.log((event.target.value.username))
      props.loginUser(email,username,props.date);
    }}>
      <div className="form-group">
        <div className="profile_box">
          <div className="profile_title">
            <label htmlFor="Profile" className="control-profile-label">Profile</label>
          </div>
          <div>
            <div className="profile_body">
              <img src={profilePic} className="profilePic" alt ="profilePic"></img>

              <input type="text" className="profile_body_username" placeholder={props.username}
               value={username} onChange={event => {setUsername(event.target.value.username);
              }}/>
              
              <input type="email" className="profile_body_email" placeholder={props.email}
                value={email} onChange={event => {setEmail(event.target.value.email);
              }}/>
              
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
export default ReviewFormModal;
