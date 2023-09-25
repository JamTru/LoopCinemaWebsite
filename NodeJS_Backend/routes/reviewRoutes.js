module.exports = (express, app) => {
  const controller = require("../controllers/reviewsController.js");
  const router = express.Router();

  //
  router.get("/", controller.findAllReviews);
  //
  router.get("/select/:movieID", controller.findGivenMovieReview);
  //
  router.get("/select/:movieID/:username", controller.findUsersReview);
  //
  router.get("/select/:username", controller.findAllUserReviews);

  // Add routes to server.
  app.use("/api/reviews", router);
};
