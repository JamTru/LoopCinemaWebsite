import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import {displayRelevantReservations} from '../data/repository.js';

const ReservationDisplay = (props) => {
  /**
   *  Upon loading, fetch all reservations that belong to the user's profile and
   * present it on user page.
   */
  const usernamePK = props.username;
  const [reserveArray, setReserveArray] = useState([]);
  useEffect(() => {
    async function fetchReservations() {
      const reservesForUser = await displayRelevantReservations(usernamePK);
      //Formatting the Array results so that it only displays relevant information to the table to use
      const formattedReserveArray = reservesForUser.map(({userReservesID, movieName, reserveDate, seatsReserved}) => ({userReservesID, movieName, reserveDate, seatsReserved}));
      setReserveArray(formattedReserveArray);

    }
    fetchReservations();
  }, [usernamePK]);

  return(
    <>
      <Table striped bordered hover variant="dark" response>
        <thead>
          <tr>
            <th></th>
            <th>Movie Name</th>
            <th>Date of Reservation</th>
            <th>Number of Seats</th>
          </tr>
        </thead>
        <tbody>
          {reserveArray.map((item) => (
            <tr key={item.userReservationID}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ReservationDisplay;
