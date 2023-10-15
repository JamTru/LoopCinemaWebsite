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
      /*On initial render, check if any reservations exist for current date.*/
      const reserveExists = await checkReservationExists(props.movieID, date);
      console.log(reserveExists);
      if (reserveExists.length == 0){//If none, 10 seats available
        console.log("no reserve exists");
        setSeatsInputAvailable(true);
        setSeatsAvailable(10);
        setDisplayMessage("This movie has 10 seats available for reservation.");
      } else if (reserveExists[0].noOfSeatsRemaining > 0) {
        //If some seats available, display that amount.
        console.log("reserve with spare seats exist");
        setSeatsInputAvailable(true);
        setSeatsAvailable(reserveExists[0].noOfSeatsRemaining);
        setDisplayMessage("This movie has " + reserveExists[0].noOfSeatsRemaining + " seats available for reservation.");
      } else {
        //Disable both seat input and submission input as no seats remain for the date.
        console.log("reserve exists but no spare seats")
        setSeatsInputAvailable(false);
        setSeatsAvailable(reserveExists[0].noOfSeatsRemaining);
        setDisplayMessage("");
      }
    }
    checkThatReservationExists();
  }, [date, currentMovieID]) //Because these variables are declared before the effect, they need to be inside the dependency array



  const handleSubmit = async (event) => {
    event.preventDefault();
    const reserveExists = await checkReservationExists(props.movieID, date);
    // checks if a reservation exissts for current observed date.
    if (reserveExists.length == 0){
      // If reservation exists
      const reserveData = await createNewReservations(props.movieID, props.movieName, date, seatsReserved, props.username.username);
      const updateResponse = await updateExistingReservation(props.movieID, props.movieName, date, seatsReserved, props.username.username, reserveData.movieReservationID);
      props.onHide();
    } else {
      if(reserveExists[0].noOfSeatsRemaining >= seatsReserved){
        await updateExistingReservation(props.movieID, props.movieName, date, seatsReserved, props.username, reserveExists.movieReservationID);
        props.onHide();
      } else{
          setErrorDetected("You are trying to book more seats than is available. Only " + reserveExists.noOfSeatsRemaining + " remain.");
      }
    }
  }
  console.log(props.username.username)
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
          {/*
            If the useEffect returns a reservation entry in movieReserveDB that has no seats left, it will replace the input with a warning
            and hide the input so users cannot try to reserve in a completely booked movie.
            */}
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
          {/*If no seats are left available, completely disable the ability to submit form.*/}
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
