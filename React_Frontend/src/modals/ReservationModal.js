import React, {useState, useEffect} from 'react';
import { Modal, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {createNewReservations, updateExistingReservation, checkReservationExists} from '../data/repository.js';

const ReservationModal = (props) => {
  const [date, setDate] = useState(props.currentDate);
  const [seatsReserved, setSeatsReserved] = useState(0);
  const [errorDetected, setErrorDetected] = useState(null);
  const [seatsAvailable, setSeatsAvailable] = useState(10);
  const [displayMessage, setDisplayMessage] = useState('');
  const [seatsInputAvailable, setSeatsInputAvailable] = useState(false);
  const currentMovieID = props.movieID;
  useEffect(() => {
    async function checkThatReservationExists() {
      const reserveExists = await checkReservationExists(props.movieID, date);
      if (reserveExists.length == 0){
        setSeatsInputAvailable(true);
        setSeatsAvailable(10);
        setDisplayMessage("This movie has 10 seats available for reservation.");
      } else if (reserveExists[0].noOfSeatsRemaining > 0) {
        setSeatsInputAvailable(true);
        setSeatsAvailable(reserveExists[0].noOfSeatsRemaining);
        setDisplayMessage("This movie has " + seatsAvailable + " seats available for reservation.");
      } else {
        setSeatsInputAvailable(false);
        setSeatsAvailable(reserveExists[0].noOfSeatsRemaining);
        setDisplayMessage("");

      }
    }
    checkThatReservationExists();
  }, [date, currentMovieID])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reserveExists = await checkReservationExists(props.movieID, date);
    console.log("reserve has been checked");
    console.log(reserveExists);
    if (reserveExists.length == 0){
      console.log("new reservation made");
      const reserveData = await createNewReservations(props.movieID, props.movieName, date, seatsReserved, props.username);
      console.log("update done now")
      console.log(reserveData);
      const updateResponse = await updateExistingReservation(props.movieID, props.movieName, date, seatsReserved, props.username, reserveData.movieReservationID);
      console.log("now it will hide");
      console.log(updateResponse);
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
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Book your seats for: {props.movie}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Booking for {props.movieName} </h2>
        <p>{displayMessage}</p>
        <form onSubmit={handleSubmit} id="reviewForm">
          <div className="form-group">
            {seatsInputAvailable ? (
              <label htmlFor="seatReserve" className="control-label">You Can Reserve Up To 10 Seats</label>
            ) : (
              <span className="text-danger">Seats are sold out for this date.</span>
            )}
            <input type={seatsInputAvailable ? 'number' : 'hidden'} name="seatReserve" id="seatReserve" min="1" max={seatsAvailable} className="form-control" required onChange={e => setSeatsReserved(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="dateInput" className="control-label">Pick the date.</label>
            <input type="date" name="dateInput" id="dateInput" min={props.currentDate} className="form-control" required onChange={e => setDate(e.target.value)}></input>
          </div>
          <Button type='submit' disabled={!seatsInputAvailable ? true : false} variant="primary">Submit</Button>
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
