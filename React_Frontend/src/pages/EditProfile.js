import React from 'react';
import profilePic from '../profilePic.png'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateVerify, findUser} from "../data/repository"
// import { updateUser } from '../../../NodeJS_Backend/controllers/userController';

function EditProfile(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(props.email)
  const [displayUsername, setDisplayUsername] = useState(props.displayUsername)

  return (
    <>
    <form onSubmit= { async event => {
      event.preventDefault();
      console.log("Email:", email);
      console.log("Username:", props.username);
      console.log("Display Username: ", props.displayUsername)
      console.log("Password: ", props.password)
      console.log(props.email, props.username);


      // HERE props.displayUsername is the previous username
      // and the displayUsername is the changed username will display later
      const user = await updateVerify(props.username, displayUsername, email);
      // const updatedUser = await findUser(props);

      console.log("(1)UPDATE USERNAME : " + user.displayUsername + " and " + user.email)
      // find user info which was updated just above

      console.log("(2)setUpdate Value : " + JSON.stringify(user))

      props.loginUser(user.username, user.displayUsername, user.passwordHash, user.email, user.createdTimeStamp)

      // username, password, email, date
      console.log("(3)Upaded user info : " + JSON.stringify(user))

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
                placeholder={props.displayUsername}
                value={displayUsername}
                onChange={event => setDisplayUsername(event.target.value)
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
