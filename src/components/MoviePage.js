import React, {useState} from 'react';
import YoutubeEmbed from './YoutubeEmbed.js';
import './MoviePage.css';
import ReviewFormModal from '../modals/ReviewFormModal.js';
import ReviewDisplay from './ReviewDisplay.js';
const MoviePage = ({name, summary, rating, genre, release, trailer, imageRef}) => {
  const [reviewModalOn, setReviewModalOn] = useState(false);//State logic to handle display of modal
  const isLogged = localStorage.getItem("user") !== null ? "show" : "doNotShow";
  return (
    <div>
      <div className="movieInfo">
        <img src={imageRef} className="promophoto"></img>
        <div className="block-display">
          <h2 className="title">{name}</h2>
          <p className="summary">{summary}</p>
          <p className="ageRating" lang={rating == "MA15+" ? "MA" : rating}>{rating}</p>
          <p>{genre + " | " + release}</p>
        </div>
      </div>
      <YoutubeEmbed embedID={trailer} />
      <ReviewFormModal show={reviewModalOn} onHide={()=> setReviewModalOn(false)} movie={name} />
      <div className="background">
        <button type="button" onClick={() => setReviewModalOn(true)} className={isLogged}>Leave a Review!</button>
        <ReviewDisplay />
      </div>
    </div>
  );
}

export default MoviePage;
