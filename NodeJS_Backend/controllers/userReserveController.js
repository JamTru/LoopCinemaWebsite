const db = require("../database");

exports.findAll = async (req, res) => {
  // Finds all elements in database
  const userReservations = await  db.userReserves.findAll();
  res.json(userReservations);
}
exports.findAllByUserID = async (req, res) => {
  const userReservations = await db.userReserves.findAll({
    where: {
      userUsername: req.params.username
    }
  });
}

exports.createNewUserReservation = async (req, res) => {
  // Creates a new User Reservation
  const userReservation = await db.userReserves.create({
    userUsername:  req.params.username,
    movieMovieID: req.params.movieID,
    movie: req.params.movieName,
    reserveDate: req.params.date,
    seatsReserved: req.params.noOfSeats
  });
  res.json(userReservation);
}
