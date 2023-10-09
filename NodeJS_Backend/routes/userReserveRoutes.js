module.exports = (express, app) => {
  const controller = require("../controllers/userReserveController.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.findAll);

  // Select a single user with id.
  router.get("/select/:username", controller.findAllByUserID);

  // Add Reservation to Database
  router.post("/", controller.createNewUserReservation);

  // Add routes to server.
  app.use("/api/userReserves", router);
};
