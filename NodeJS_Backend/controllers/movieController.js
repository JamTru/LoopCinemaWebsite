const db = require("../database");


//Read
exports.findAllMovies = async (req, res) => {
  const movies = await db.movies.findAll();
  res.json(movies);
}

exports.findMovie = async (req, res) => {
  const movie = await db.movies.findByPk(req.params.id);
  res.json(movie);
}
