import React from "react";



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
                    <div className="profile_body">
                        <div>
                            <label>{props.username}</label>
                            
                        </div>
                        <div>
                            <label>{props.email}</label>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="profile_footer">
                        <label>{props.date}</label>
                    </div>
                </div>
                
            </div>
        </form>
        
    );
}

export default Profile;