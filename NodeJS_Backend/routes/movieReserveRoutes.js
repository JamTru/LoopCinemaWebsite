module.exports = (express, app) => {
  const controller = require("../controllers/movieReserveController.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.findAll);

  // Select a single user with id.
  router.get("/select/:movieID/:dateOfViewing", controller.findByDateAndMovie);

  // Add Reservation to Database
  router.post("/", controller.createNewMovieReservation);

  // Updates the Reservation whenever a new reservation is made.
  router.put("/update/:reserveID/:seatsRequested", controller.subtractSeats);

  // Add routes to server.
  app.use("/api/moviesReserves", router);
};
