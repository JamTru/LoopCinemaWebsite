import React, {useState} from 'react';
import YoutubeEmbed from './YoutubeEmbed.js';
import './MoviePage.css';
import ReviewFormModal from '../modals/ReviewFormModal.js';
import ReviewDisplay from './ReviewDisplay.js';
const MoviePage = ({name, summary, rating, genre, release, trailer, imageRef}) => {
  const [reviewModalOn, setReviewModalOn] = useState(false);//State logic to handle display of modal
  const isLogged = localStorage.getItem("user") !== null ? "show" : "doNotShow";
  const userArray = JSON.parse(localStorage.getItem("users"));
  const usersWithReviews = userArray.filter((user) => localStorage.getItem(user.email) !== null);

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
        <h2>Most Recent Reviews</h2>
        {
          usersWithReviews.map((user, index) => {
            const arrayOfReviewDetails = JSON.parse(localStorage.getItem(user.email));
            const reviewDetails = arrayOfReviewDetails.filter((review) => review.name === name)[0];
            if (typeof reviewDetails !== "undefined"){
              return <ReviewDisplay movieName={reviewDetails.name} username={user.username} date={reviewDetails.date} numValue={reviewDetails.numRate} comment={reviewDetails.commentString} />
            }
          })
        }
      </div>
    </div>
  );
}

export default MoviePage;
