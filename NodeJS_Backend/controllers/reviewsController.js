const db = require("../database");


// Reads all reviews
exports.findAllReviews = async (req, res) => {
  const reviews = await db.reviews.findAll();
  res.json(reviews);
}
// Reads all reviews of given Movie ID
exports.findGivenMovieReview = async (req, res) => {
  const movieReviews = await db.reviews.findAll({
    where: {
      movieMovieID: req.params.movieID
    }
  });
  res.json(movieReviews);
}
// Reads user review for given movie
exports.findUsersReview = async (req, res) => {
  const movieReviews = await db.reviews.findAll({
    where: {
      movieMovieID: req.params.movieID,
      userUsername: req.params.username
    }
  });
  res.json(movieReviews);
}
// Reads all user reviews
exports.findAllUserReviews = async (req, res) => {
  const usersReviews = await db.reviews.findAll({
    where: {
      userUsername: req.params.username
    }
  })
  res.json(usersReviews);
}
// Creates new Review
exports.createNewReview = async (req, res) => {
  const newReview = await db.reviews.create({
    rating: req.body.numRating,
    comment: req.body.comment,
    userUsername: req.body.username,
    movieMovieID: req.body.movieID
  });
  res.json(newReview);
}

exports.deleteReview = async (req, res) => {
  const findReview = await db.reviews.destroy({
    where: {
      userUsername: req.params.username
    }
  })
  
  res.json(findReview);
}
