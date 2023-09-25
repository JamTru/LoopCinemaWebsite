const db = require("../database");


//Read
exports.findAllReviews = async (req, res) => {
  const reviews = await db.reviews.findAll();
  res.json(reviews);
}

exports.findGivenMovieReview = async (req, res) => {
  const movieReviews = await db.review.findAll({
    where: {
      movieID: req.params.movieID
    }
  });
  res.json(movieReviews);
}

exports.findUsersReview = async (req, res) => {
  const movieReviews = await db.reviews.findAll({
    where: {
      movieID: req.params.movieID,
      username: req.params.username
    }
  });
  res.json(movieReviews);
}

exports.findAllUserReviews = async (req, res) => {
  const usersreviews = await db.reviews.findAll({
    where: {
      username: req.params.username
    }
  })
}
