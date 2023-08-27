import React  from 'react';
import profilePic from '../profilePic.png'
import profileEditIcon from '../editIcon.png'
import profileRemoval from '../remove.png'
import { deleteVerify } from '../data/repository'
import { useNavigate } from "react-router-dom";


function Profile(props) {
    const navigate = useNavigate();

    const handleDelete = (event) => {
        console.log(props)
        deleteVerify(props.email, props.username, props.password, props.date)
        navigate('/')
    }
    return (
        <>
        <form >
            <div className="form-group">
                <div className="profile_box">
                    <div className="profile_title">
                        <label htmlFor="Profile" className="control-profile-label">Profile</label>
                    </div>
                    <div>
                        <div className="profile_body">
                            <img src={profilePic} className="profilePic" alt ="profilePic"></img>
                            <label className="profile_body_username">{props.username}</label>
                            
                            <button variant="contained" className="remove_button" onClick={handleDelete} >
                                <img src={profileRemoval} className="profileRemoval" alt="remove" />
                            </button>

                            {/* <Link to ='./EditProfile.js'> */}
                            <button variant="contained" className="edit_button" onClick={ () => navigate('./EditProfile.js')} >
                                <img src={profileEditIcon} className="profileEditIcon" alt="edit" />
                            </button>
                            {/* </Link> */}

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
        </>
    );
    
}

export default Profile;
