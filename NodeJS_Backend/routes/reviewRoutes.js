module.exports = (express, app) => {
  const controller = require("../controllers/reviewsController.js");
  const router = express.Router();

  //
  router.get("/", controller.findAllReviews);
  //
  router.get("/selectByMovie/:movieID", controller.findGivenMovieReview);
  //
  router.get("/selectByUser/:username", controller.findUsersReview);
  //
  router.get("/getSpecificReview/:movieID/:username", controller.findGivenMovieReview);
  //
  router.post("/create", controller.createNewReview);

  router.post("/delete/:username", controller.deleteReview);
  // Add routes to server.
  app.use("/api/reviews", router);
};
