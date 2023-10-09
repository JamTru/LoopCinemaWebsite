import React, {useState} from 'react';
import { Modal, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {createNewReservations, updateExistingReservation, checkReservationExists} from '../data/repository.js';

const ReviewFormModal = (props) => {
  const [date, setDate] = useState('');
  const [seatsReserved, setSeatsReserved] = useState(0);
  const [errorDetected, setErrorDetected] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reserveExists = await checkReservationExists(props.movieID);
    if (reserveExists.length == 0){
      await createNewReservations(props.movieID, props.movieName, date, seatsReserved, props.username);
      props.onHide();
    } else {
      if(reserveExists.noOfSeatsRemaining >= seatsReserved){
        await updateExistingReservation();
        props.onHide();
      } else{
          setErrorDetected("You are trying to book more seats than is available. Only " + reserveExists.noOfSeatsRemaining + " remain.");
      }
    }
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Book your seats for: {props.movie}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} id="reviewForm">
          <div className="form-group">
            <label htmlFor="seatReserve" className="control-label">You Can Reserve Up To 10 Seats</label>
            <input type="number" name="seatReserve" id="seatReserve" min="1" max="10" className="form-control" required onChange={e => setSeatsReserved(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="dateInput" className="control-label">Pick the date.</label>
            <input type="date" name="dateInput" id="dateInput" min={today} className="form-control" required onChange={e => setDate(e.target.value)}></input>
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
export default ReservationModal;
