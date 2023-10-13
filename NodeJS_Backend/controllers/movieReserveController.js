const db = require("../database");

exports.findAll = async (req, res) => {
  // Finds all elements in database
  const movieReservations = await  db.movieReserves.findAll();
  res.json(movieReservations);
}

exports.findByDateAndMovie = async (req, res) => {
  // Finds a reservation based on a given movie ID and specific date
  const movieReservations = await  db.movieReserves.findAll({
    where: {
      movieMovieID: req.params.movieID,
      dateOfViewing: req.params.dateOfViewing
    }
  });
  res.json(movieReservations);
}

exports.createNewMovieReservation = async (req, res) => {
  // Creates a new movie Reservation
  const movieReservation = await db.movieReserves.create({
    movieMovieID: req.body.movieID,
    movieName: req.body.movieName,
    dateOfViewing: req.body.date,
    noOfSeatsRemaining: 10
  });
  res.json(movieReservation);
}
exports.subtractSeats = async (req, res) => {
  // Finds a given movie reservation and updates the number of seating by subtracting it by the number requested
  const movieReservation = await db.movieReserves.findByPk(req.params.reserveID);
  await movieReservation.decrement('noOfSeatsRemaining', {by: req.params.seatsRequested});
  res.json(true);
}
