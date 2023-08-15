import React from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'

const SignInModal = ({ show, onHide }) => {
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
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button block variant="info" type="button">
                            Sign In
                        </Button>
                
                    </Form>
                </Modal.Body>
            
            </Container>
        </Modal>
    )
}

export default SignInModal