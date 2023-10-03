import React, { useState, useEffect }from "react";
import MoviePage from '../components/MoviePage.js';
import {retrieveDataByMovieID, testAPICall} from '../data/repository.js';

function HP_mov() {
  const [movieInfo, setMovieInfo] = useState([]);
  useEffect(() => {
    async function loadMovieData() {
      const movieData = await retrieveDataByMovieID("2");
      setMovieInfo(movieData);
    }
    loadMovieData();
  }, []);
  return (
    <div>
      <MoviePage name={movieInfo.title} summary={movieInfo.summary} rating={movieInfo.ageRatingAgeRating} genre={movieInfo.genre} release={movieInfo.releaseDate} movieID={movieInfo.movieID} trailer="7lJ6Suyp1ok" imageRef="/MoviePoster/HP_Vertical.jpg"  />
    </div>
  );
}
export default HP_mov;
