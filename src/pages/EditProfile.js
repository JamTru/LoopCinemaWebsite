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
    <form>
        <div className="form-group">
            <div className="profile_box">
                <div className="profile_title">
                  <label htmlFor="Profile" className="control-profile-label">Profile</label>
                </div>
                <div>
                  <div className="profile_body">
                    <img src={profilePic} className="profilePic" alt ="profilePic"></img>

                    <input tpe="text" className="profile_body_username" placeholder={props.username}/>
                    
                    <button variant="contained" className="remove_button" >
                    </button>
                    
                    <button variant="contained" className="edit_button" onClick={ () => navigate('./EditProfile.js')} >
                    </button>

                    <input className="profile_body_email" placeholder={props.email}></input>
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
