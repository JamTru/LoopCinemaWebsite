import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviePage from '../components/MoviePage.js';
import {retrieveDataByMovieID, testAPICall} from '../data/repository.js';

function SM_mov() {
  const [movieInfo, setMovieInfo] = useState([]);
  //On initial render, load the data necessary for the movie
  useEffect(() => {
    async function loadMovieData() {
      const movieData = await retrieveDataByMovieID("5");
      setMovieInfo(movieData);
    }
    loadMovieData();
  }, []);
  return (
    <div>
      <MoviePage name={movieInfo.title} summary={movieInfo.summary} rating={movieInfo.ageRatingAgeRating} genre={movieInfo.genre} release={movieInfo.releaseDate} movieID={movieInfo.movieID} trailer="g4Hbz2jLxvQ" imageRef="/MoviePoster/SM_vertical.jpg" />
    </div>
  );
}
export default SM_mov;
