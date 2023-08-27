import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { signupVerify} from "../data/repository";
import { Modal, Container } from 'react-bootstrap';

function SignUpModal(props) {
    const [fields, setFields] = useState({ email: "", username: "", password: "" });
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
        const temp = { email: fields.email, username: fields.username, password: fields.password };
        // OR use spread operator.
        // const temp = { ...fields };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }
    const handleInputChangePw = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        const regexPw =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

        if (regexPw.test(value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }

        // Copy fields.
        const temp = { email: fields.email, username: fields.username, password: fields.password };
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
        const temp = { email: fields.email, username: fields.username, password: fields.password };
        // OR use spread operator.
        // const temp = { ...fields };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Get the current date in AEST (Australia Eastern Standard Time)
        const currentDate = new Date()
    
        // Format the date and update the state
        setCurrentTime(formatAESTDate(new Date(currentDate)));
        console.log(" Bottom ")
        console.log(currentDate);
        console.log(currentTime);
        //setCurrentTime((currentTime));
        
    
        console.log(usernameVaild)

        if (usernameVaild === false){
            setErrorMessage("Please, enter Username ")
            return;
        }
        const signupVerified = signupVerify(fields.email, fields.username, fields.password, (formatAESTDate(new Date(currentDate))));
        
        // to Check loginUser is in props
        if ("setloginUser" in props) {
            // we have loginUser
            console.log("We have that prop in SignInMOdal ")
            console.log(props)
        } else {
            console.log("loginUser wasn't in props!")
            console.log(props)
            //console.log(onCreated)
        }

        // If onCreat sign-up the user.
        if(signupVerified === true) {
            //setUsers(fields.username, fields.password);
            // localStorage.setItem(Number(localStorage.length)+1, JSON.stringify(fields))
            
            if (emailValid && pwValid){

                props.setloginUser(fields.email, fields.username, fields.password, (formatAESTDate(new Date(currentDate))));
                
                // Navigate to the home page.
                navigate("./Profile.js");
                // <Link to={"Profile.js"}> </Link>
                props.onHide(false)
                return;
            }
              
        }
      // Reset password field to blank.
        const temp = { ...fields };
        temp.password = "";
        setFields(temp);

        //Set error message.
        setErrorMessage("Email already exists or Username is empty, please try again.");
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
                            <label htmlFor="email" className="control-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder='example@gmail.com'
                                value={fields.email}  onChange={handleInputChangeEmail}/>
                        </div>
                        <div className = "errorMessageWrap">
                            {/* when email is invalid and there is input, show the message */}
                            {!emailValid && fields.email.length > 0 && (
                                <div> Please enter correct Email format. </div>            
                            )} 
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="control-label">Username</label>
                            <input name="username" id="username" className="form-control"
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
