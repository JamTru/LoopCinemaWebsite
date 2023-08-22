import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { signupVerify} from "../data/repository";
import { Modal, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ReviewFormModal = (props) => {
  const [numRating, setNumRating] = useState(0);
  const [comments, setComments] = useState("");
  const [errorDetected, setErrorDetected] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(comments.length);
    if (comments.length <= 0 || comments.length > 250) {
      setErrorDetected("Comments need to be between 0 to 250 characters.")
      console.log("Error message");
    }
    else {
      console.log("Successful Submission");
      props.onHide();
    }
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
            <input type="number" name="numRating" id="numRating" min="0" max="100" className="form-control" required onChange={e => setNumRating(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="comments" className="control-label">What were your thoughts?</label>
            <textarea rows="4" cols="50" name="comments" form="reviewForm" onChange={e => setComments(e.target.value)} required></textarea>
          </div>
          <Button type="submit" variant="primary">Submit</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {errorDetected != null &&
          <div className="form-group">
            <span className="text-danger">{errorDetected}</span>
          </div>
        }
      </Modal.Footer>
    </Modal>
  )
}
export default ReviewFormModal;