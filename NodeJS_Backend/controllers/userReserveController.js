const db = require("../database");

exports.findAll = async (req, res) => {
  // Finds all elements in database
  const userReservations = await  db.userReserves.findAll();
  res.json(userReservations);
}
exports.findAllByUserID = async (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const userReservations = await db.userReserves.findAll({
    where: {
      userUsername: req.params.username,
      reserveDate: {[Op.gte]: today }
    }
  });
}

exports.createNewUserReservation = async (req, res) => {
  // Creates a new User Reservation
  const userReservation = await db.userReserves.create({
    userUsername:  req.params.username,
    movieMovieID: req.params.movieID,
    movieName: req.params.movieName,
    reserveDate: req.params.date,
    seatsReserved: req.params.noOfSeats
  });
  res.json(userReservation);
}
