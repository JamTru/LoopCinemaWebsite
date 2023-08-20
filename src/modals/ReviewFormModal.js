import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { signupVerify} from "../data/repository";
import { Modal, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ReviewFormModal = (props) => {
  const handleSubmit = () => {
    console.log("Form submitted");
  }
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>How Was {props.movie}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Have your say on the film!</h2>
        <form onSubmit={handleSubmit} id="reviewForm">
          <div className="form-group">
            <label htmlFor="numRating" className="control-label">Rate from 0 to 100</label>
            <input type="number" name="numRating" id="numRating" min="0" max="100" className="form-control" required></input>
          </div>
        </form>
        <div className="form-group">
          <label htmlFor="comments" className="control-label">What were your thoughts?</label>
          <textarea rows="4" cols="50" name="comments" form="reviewForm"></textarea> 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ReviewFormModal;
