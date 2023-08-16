import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";
import { Modal, Button, Form, Container } from 'react-bootstrap'

function SignInModal(props) {
    const [fields, setFields] = useState({ username: "", password: "" });
    // const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    // Generic change handler.
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // Copy fields.
        const temp = { username: fields.username, password: fields.password };
        // OR use spread operator.
        // const temp = { ...fields };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    
        const verified = verifyUser(fields.username, fields.password);
    
        // If verified login the user.
        if(verified === true) {
          props.loginUser(fields.username);
    
          // Navigate to the home page.
          navigate("/");
          return;
        }
      // Reset password field to blank.
      const temp = { ...fields };
      temp.password = "";
      setFields(temp);
  
      // Set error message.
      // setErrorMessage("Username and / or password invalid, please try again.");
    }
    return (
        <Modal
            animation={false}
            show={props.show}
            onHide={props.onHide}
            signInUser={props.loginUser}
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
                    
                    <div className="form-group">
                        <label htmlFor="username" className="control-label">Username</label>
                        <input name="username" id="username" className="form-control"
                            value={fields.username} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control"
                            value={fields.password} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Sign in" />
                    </div>
                    {/* {errorMessage !== null &&
                    <div className="form-group">
                        <span className="text-danger">{errorMessage}</span>
                    </div>
                    } */}
                
                    
                </Modal.Body>
            
            </Container>
        </Modal>
    )
}

export default SignInModal