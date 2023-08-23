import React, {useState} from 'react';
import YoutubeEmbed from './YoutubeEmbed.js';
import './MoviePage.css';
import ReviewFormModal from '../modals/ReviewFormModal.js';
const MoviePage = ({name, summary, rating, genre, release, trailer, imageRef}) => {
  const [reviewModalOn, setReviewModalOn] = useState(false);

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
      <ReviewFormModal show={reviewModalOn} onHide={()=> setReviewModalOn(false)} />
      <button type="button" onClick={() => setReviewModalOn(true)}>Leave a Review!</button>
    </div>
  );
}

export default MoviePage;
