import React from 'react';
import MovieDisplay from './MovieDisplay';
import slides from "./MovieDisplayData.json";
const Content = () => {
  return (
    <div class="main">
      <MovieDisplay data={slides} />
    </div>
  );
};

export default Content;
