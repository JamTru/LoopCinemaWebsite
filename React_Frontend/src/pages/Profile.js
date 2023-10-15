import React  from 'react';
import profilePic from '../profilePic.png'
import profileEditIcon from '../editIcon.png'
import profileRemoval from '../remove.png'
import { useState } from 'react';
import { deleteVerify, deleteReview, deleteReservation } from '../data/repository'
import { useNavigate } from "react-router-dom";
import ReservationDisplay from '../components/ReservationDisplay.js';

function Profile(props) {
    const [username, setUsername] = useState();
    const navigate = useNavigate();
    // from local storage it deletes USER key data
    const handleDelete = async (event) => {
        console.log("***************>>"+ JSON.stringify(props));
        props.logoutUser();
        localStorage.removeItem(props.email)
        console.log("Deleted query: " + JSON.stringify(props));
        navigate('/')

        setUsername(props.username);

        await deleteReservation(props.username);
        await deleteReview(props.username);
        await deleteVerify(props.username, props.displayUsername, props.email);
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
                            <label className="profile_body_username">{props.displayUsername}</label>

                            <button variant="contained" className="remove_button" onClick={handleDelete} >
                                <img src={profileRemoval} className="profileRemoval" alt="remove" />
                            </button>


                            <button variant="contained" className="edit_button" onClick={ () => navigate('./EditProfile.js')} >
                                <img src={profileEditIcon} className="profileEditIcon" alt="edit" />
                            </button>


                            <label className="profile_body_email">{props.email}</label>
                        </div>
                    </div>
                    <div className="profile_footer">
                        <hr></hr>
                        <label>Created : {props.date.substring(0,10)}</label>
                    </div>
                </div>

            </div>
        </form>
        <ReservationDisplay username={props.username} />
        </>
    );

}

export default Profile;
