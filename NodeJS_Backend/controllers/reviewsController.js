const db = require("../database");


//Read
exports.findAllReviews = async (req, res) => {
  const reviews = await db.reviews.findAll();
  res.json(reviews);
}

exports.findGivenMovieReview = async (req, res) => {
  const movieReviews = await db.reviews.findAll({
    where: {
      movieMovieID: req.params.movieID
    }
  });
  res.json(movieReviews);
}

exports.findUsersReview = async (req, res) => {
  const movieReviews = await db.reviews.findAll({
    where: {
      movieMovieID: req.params.movieID,
      userUsername: req.params.username
    }
  });
  res.json(movieReviews);
}

exports.findAllUserReviews = async (req, res) => {
  const usersReviews = await db.reviews.findAll({
    where: {
      userUsername: req.params.username
    }
  })
  res.json(usersReviews);
}

exports.createNewReview = async (req, res) => {
  const newReview = await db.reviews.create({
    rating: req.body.numRating,
    comment: req.body.comment,
    userUsername: req.body.username,
    movieMovieID: req.body.movieID
  });
  res.json(newReview);
}
