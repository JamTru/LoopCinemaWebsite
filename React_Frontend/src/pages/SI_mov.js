import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviePage from '../components/MoviePage.js';
import {retrieveDataByMovieID, testAPICall} from '../data/repository.js';

function SI_mov() {
  const [movieInfo, setMovieInfo] = useState([]);
  //On initial render, load the data necessary for the movie
  useEffect(() => {
    async function loadMovieData() {
      const movieData = await retrieveDataByMovieID("4");
      setMovieInfo(movieData);
    }
    loadMovieData();
  }, []);
  return (
    <div>
      <MoviePage name={movieInfo.title} summary={movieInfo.summary} rating={movieInfo.ageRatingAgeRating} genre={movieInfo.genre} release={movieInfo.releaseDate} movieID={movieInfo.movieID} trailer="v8yrZSkKxTA" imageRef="/MoviePoster/SI_vertical.jpg" />
    </div>
  );
}
export default SI_mov;
