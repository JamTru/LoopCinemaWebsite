import React, {useState, useEffect} from 'react';
import { json, useNavigate } from "react-router-dom";
import { signupVerify} from "../data/repository";
import { Modal, Container } from 'react-bootstrap';
import { createNewUser, findUser} from '../data/repository.js';
import axios from 'axios';

function SignUpModal(props) {
    const [fields, setFields] = useState({ email: "", username: "", displayUsername: "", password: ""});
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [usernameVaild, setUsernameValid] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    const handleInputChangeEmail = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        const regexEmail =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        if (regexEmail.test(value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

        // Copy fields.
        const temp = { email: fields.email, username: fields.username, displayUsername:fields.username, password: fields.password};
        // OR use spread operator.
        // const temp = { ...fields };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }

    const handleInputChangePw = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        // it only allows an id to be Email format and if the input is correct email formot it returns true.
        const regexPw =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

        if (regexPw.test(value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }

        // Copy fields.
        const temp = { email: fields.email, username: fields.username, displayUsername: fields.username , password: fields.password };
        // OR use spread operator.
        // const temp = { ...fields };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }

    const handleInputChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        if (value.length > 0) {
            setUsernameValid(true);
        } else {
            setUsernameValid(false);
        }
        // Copy fields.
        const temp = { email: fields.email, username: fields.username, displayUsername: fields.username, password: fields.password };
        // OR use spread operator.

        // Update field and state.
        temp[name] = value;

        setFields(temp);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the current date in AEST (Australia Eastern Standard Time)
        const currentDate = new Date()

        // Format the date and update the state
        setCurrentTime(formatAESTDate(new Date(currentDate)));

        if (usernameVaild === false){
            setErrorMessage("Please, enter Username ")
            return;
        }

        const signupVerified = await signupVerify(fields);
       
        // it not null means "You can create the account."
        // If onCreat sign-up the user.
        if(signupVerified === null) {

            if (emailValid && pwValid){

                try {
                    // Created NewUser to create NewUser in DB. THis is the format to be saved
                    const newUser = {
                        username: fields.username,
                        displayUsername: fields.username,
                        password: fields.password,
                        email: fields.email,
                        createdTimeStamp: props.createdTimeStamp
                    }
                    
                    // Create Database First
                    await createNewUser(newUser);
                    // Brings Single user data which has just signed up
                    // Check if it is created and call
                    const user = await findUser(newUser)
                    setFields(user)
                    props.setloginUser(user.username, user.displayUsername, user.passwordHash, user.email, user.createdTimeStamp);
                    // Check result, purposely not checked here for simplicity.
                    // Result is logged to console for demostration purposes.
                    // Before navigating start updating the parent.
                    navigate('./Profile.js');
                  } catch(e) {
                    setErrorMessage(e.message);
                  }



                // <Link to={"Profile.js"}> </Link>
                props.onHide(false)
                return;
            }

        }
      // Reset password field to blank.
        const temp = { ...fields };
        temp.password = "";
        temp.displayUsername = "";
        setFields(temp);

        //Set error message.
        setErrorMessage("Username already exists or Username is empty, please try again.");
    }
    function formatAESTDate(date) {
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-AU', options);
    }

    return (
        <Modal
            animation={false}
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="username" className="control-label">Username (ID)</label>
                            <input name="username" id="username" className="form-control" placeholder="Username"
                                value={fields.username}  onChange={handleInputChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder='Must contain a minimum of 8 characters (letters, numbers and sepcial characters)'
                                value={fields.password}  onChange={handleInputChangePw}/>
                        </div>

                        <div className = "errorMessageWrap">
                            {!pwValid && fields.password.length > 0 && (
                             <div> Please enter a minimum of 8 letters <br></br>(including numbers and special characters) </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="control-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder='example@gmail.com'
                                value={fields.email}  onChange={handleInputChangeEmail} required />
                        </div>
                        <div className = "errorMessageWrap">
                            {/* when email is invalid and there is input, show the message */}
                            {!emailValid && fields.email.length > 0 && (
                                <div> Please enter correct Email format. </div>
                            )}
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Sign Up" />
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

export default SignUpModal
