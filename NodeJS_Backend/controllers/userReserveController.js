const db = require("../database");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.findAll = async (req, res) => {
  // Finds all elements in database
  const userReservations = await  db.userReserves.findAll();
  res.json(userReservations);
}
//Finds all user reviews by given ID
exports.findAllByUserID = async (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const userReservations = await db.userReserves.findAll({
    where: {
      userUsername: req.params.username,
      reserveDate: { [Op.gte] : today}
    }
  });
  res.json(userReservations);
}

// Creates a new entry in UserReserve Table
exports.createNewUserReservation = async (req, res) => {
  // Creates a new User Reservation
  const userReservation = await db.userReserves.create({
    userUsername:  req.body.username,
    movieMovieID: req.body.movieID,
    movieName: req.body.movieName,
    reserveDate: req.body.date,
    seatsReserved: req.body.noOfSeats
  });
  res.json(userReservation);
}
