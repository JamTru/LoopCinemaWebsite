import React from "react";
import profilePic from '../profilePic.png'
import profileEditIcon from '../editIcon.png'
import profileRemoval from '../remove.png'

function Profile(props) {
    //console.log("profile's props => " + JSON.stringify(props))
    // retunrs email, username
    return (
        <form >
            <div className="form-group">
                <div className="profile_box">
                    <div className="profile_title">
                        <label htmlFor="Profile" className="control-profile-label">Profile</label>
                    {/* <img src={"/MoviePoster/PC_horizontal.jpg"} alt="profile_image" className="profileLogo"></img> */}
                    </div>
                    <div>
                        <div className="profile_body">
                            <img src={profilePic} className="profilePic" alt ="profilePic"></img>
                            <label className="profile_body_username">{props.username}</label>
                            
                            <button variant="contained" className="remove_button">
                                <img src={profileRemoval} className="profileRemoval" alt="remove" />
                            </button>

                            <button variant="contained" className="edit_button">
                                <img src={profileEditIcon} className="profileEditIcon" alt="edit" />
                            </button>
                            
                            {/* <img src={profileRemoval} className="profileRemoval" alt="profileRemoval"></img>
                            <img src={profileEditIcon} className="profileEditIcon" alt="profileEditIcon"></img> */}

                            <label className="profile_body_email">{props.email}</label>
                        </div>
                    </div>
                    <div className="profile_footer">
                        <hr></hr>
                        <label>{props.date}</label>
                    </div>
                </div>

            </div>
        </form>

    );
}

export default Profile;
