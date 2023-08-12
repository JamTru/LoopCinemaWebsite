import React from 'react';
import MovieDisplay from './MovieDisplay';
import slides from "./MovieDisplayData.json";
const Content = () => {
  return (
    <div className="main">
      <div className="NowShowing" style={{}}>
        <MovieDisplay data={slides} />
      </div>
    </div>
  );
};

export default Content;
/*Photo by <a href="https://unsplash.com/@leopoldkristjansson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Leópold Kristjánsson</a> on <a href="https://unsplash.com/photos/y5vSUD-tDYk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  */
