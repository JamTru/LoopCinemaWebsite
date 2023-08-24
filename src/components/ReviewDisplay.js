import React from 'react';
import './ReviewDisplay.css';
const ReviewDisplay = ({movieName}) => {
  let score = null;
  const dummy = 90;
  if (dummy < 40) {
    score = "B";
  } else if (dummy < 70) {
    score = "M";
  } else {
    score = "G";
  }
  return (
    <div className="reviewCompartment">
      <h2>Most Recent Reviews</h2>
      <div className="boxed">
        <p><span lang={score}>{dummy}</span><i> Username</i></p>
        <p>DD/MM/YYYY</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis odio quis tellus vestibulum interdum sed a nulla. Curabitur ultrices dapibus fringilla. Donec accumsan interdum lacus, vitae posuere nibh interdum ac. Curabitur hendrerit ante in et.</p>
      </div>
    </div>
  )
}

export default ReviewDisplay;
