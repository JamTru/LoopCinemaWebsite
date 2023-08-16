import React from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'

const SignUpModal = ({ show, onHide }) => {
    return (
        <Modal
            animation={false}
            show={show}
            onHide={onHide}
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
    
                    <div className="form-group">
                        <label htmlFor="username" className="control-label">Username</label>
                        <input name="username" id="username" className="form-control"
                                />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control"
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Sign Up" />
                    </div>
                
                </Modal.Body>
            
            </Container>
        </Modal>
    )
}

export default SignUpModal