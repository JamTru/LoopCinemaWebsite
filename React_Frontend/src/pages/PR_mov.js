import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviePage from '../components/MoviePage.js';

function PR_mov() {
  const [movieInfo, setMovieInfo] = useState([]);
  useEffect(() => {
    async function loadMovieData() {
      const movieData = await retrieveDataByMovieID("3");
      setMovieInfo(movieData);
    }
    loadMovieData();
  }, []);
  return (
    <div>
      <MoviePage name={movieInfo.title} summary={movieInfo.summary} rating={movieInfo.ageRatingAgeRating} genre={movieInfo.genre} release={movieInfo.releaseDate} movieID={movieInfo.movieID} trailer="5guMumPFBag" imageRef="/MoviePoster/PC_vertical.jpg"/>
    </div>
  );
}
export default PR_mov;
