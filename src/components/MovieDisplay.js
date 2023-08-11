import React, { useEffect, useState } from 'react';
import "./MovieDisplay.css";
export const MovieDisplay = ({data}) => {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide === data.slides.length - 1 ? 0 : slide + 1);
  }
  const prevSlide = () => {
    setSlide(slide === 0 ? data.slides.length - 1 : slide - 1);
  }
  return (
    <div className="slideshow">
      <button className="arrow arrow-prev" onClick={prevSlide}>&#10094;</button>
      {
        data.slides.map((item, index) => {
          return <img src={item.src} alt={item.alt} key={index} className={slide === index ? "slide" : "slide slide-hidden"}></img>
        })
      }
      <button className="arrow arrow-next" onClick={nextSlide}>&#10095;</button>
    </div>
  )
}
export default MovieDisplay;

/*https://www.movieposterdb.com/spider-man-into-the-spider-verse-i4633694/3b6e101f*/
/*https://www.movieposterdb.com/spider-man-into-the-spider-verse-i4633694/c972173e*/

/*https://www.movieposterdb.com/pacific-rim-i1663662/bcca7c00*/
/*https://www.movieposterdb.com/pacific-rim-i1663662/faf37eb2*/

/*https://www.movieposterdb.com/harry-potter-and-the-goblet-of-fire-i330373/cf0b9637*/
/*https://www.movieposterdb.com/harry-potter-and-the-goblet-of-fire-i330373/891b1dbe*/

/*https://www.movieposterdb.com/shutter-island-i1130884/6f5c351f*/
/*https://www.movieposterdb.com/shutter-island-i1130884/a4f897bc*/
