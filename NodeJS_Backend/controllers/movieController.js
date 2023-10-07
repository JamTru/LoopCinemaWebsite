const db = require("../database");

//Will Return Array List of All Movies
exports.findAllMovies = async (req, res) => {
  const movies = await db.movies.findAll();
  res.json(movies);
}
// Will return array list of a movie given an ID
exports.findMovie = async (req, res) => {
  const movie = await db.movies.findByPk(req.params.movieID);
  res.json(movie);
}
