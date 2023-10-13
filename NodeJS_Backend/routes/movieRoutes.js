module.exports = (express, app) => {
  const controller = require("../controllers/movieController.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.findAllMovies);

  // Select a single user with id.
  router.get("/select/:movieID", controller.findMovie);

  router.get("/helloWorld", (req, res) => {res.send("Hello World")});

  // Add Movie to Database
  // router.get("/addMovie", controller.addMovie);

  // Add routes to server.
  app.use("/api/movies", router);
};
