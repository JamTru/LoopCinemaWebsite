import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";
import { Modal,Container } from 'react-bootstrap'
import { getUser, removeUser } from "../data/repository";

function SignInModal(props) {
    const [fields, setFields] = useState({username: "", displayUsername: "", password: "", email: "", createdTimeStamp: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Generic change handler.
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        // Copy fields.
        const temp = { email: fields.email, displayUsername: fields.displayUsername, username: fields.username, password: fields.password };
        // OR use spread operator.

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await verifyUser(fields.displayUsername, fields.password);        
        // If verified login the user.
        if(user != null) {
            
            props.setloginUser(user.username, user.displayUsername, user.passwordHash, user.email, user.createdTimeStamp);
            
            // Navigate to the home page.
            navigate('./Profile.js');
            
            props.onHide(false)
        }
        
      // Reset password field to blank.
      const temp = { ...fields };
      temp.displayUsername = "";
      temp.password = "";
      setFields(temp);
  
      //Set error message.
      setErrorMessage("Username and / or password invalid, please try again.");
    }
    return (
        <Modal
            animation={false}
            show={props.show}
            onHide={props.onHide}
            // signInUser={props.setloginUser}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign In
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="displayUsername" className="control-label">Username</label>
                            <input name="displayUsername" id="displayUsername" className="form-control" placeholder='username'
                                value={fields.displayUsername} onChange={handleInputChange}/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label> 
                            <input type="password" name="password" id="password" className="form-control" placeholder='Must contain a minimum of 8 characters (letters, numbers and sepcial characters)'
                                value={fields.password} onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Sign in" />
                        </div>
                        {errorMessage !== null &&
                        <div className="form-group">
                            <span className="text-danger">{errorMessage}</span>
                        </div>
                        }
                    </form>
                </Modal.Body>

            </Container>
        </Modal>
    )
}

export default SignInModal