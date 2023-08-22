import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { signupVerify} from "../data/repository";
import { Modal, Container } from 'react-bootstrap';

function SignUpModal(props) {
    const [fields, setFields] = useState({ email: "", username: "", password: "" });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);


    const handleInputChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

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
        console.log(fields)
        const signupVerified = signupVerify(fields.email, fields.username, fields.password);

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
            props.setloginUser(fields.email, fields.username);

            // Navigate to the home page.
            navigate("/");
            props.onHide(false)
            return;
        }
      // Reset password field to blank.
      const temp = { ...fields };
      temp.password = "";
      setFields(temp);

      //Set error message.
      setErrorMessage("Username already exists, please try again.");
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
                            <input type="email" name="email" id="email" className="form-control"
                                value={fields.email}  onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="control-label">Username</label>
                            <input name="username" id="username" className="form-control"
                                value={fields.username}  onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control"
                                value={fields.password}  onChange={handleInputChange}/>
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
