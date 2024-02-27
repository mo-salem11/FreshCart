import React, { useState, useEffect } from 'react';

const RatingToStars = ( {apiRating} ) => {
  const [stars, setStars] = useState(0);
  const [hasHalfStar, setHasHalfStar] = useState(false);

  useEffect(() => {
    const ratingNumber = parseFloat(apiRating);
    const numStars = Math.floor(ratingNumber);
    const remainder = ratingNumber  % 1;
  
    if (remainder >= 0.25 && remainder <= 0.75) {
        setHasHalfStar(true);
        setStars(numStars);
      } else if (remainder > 0.75) {
        setHasHalfStar(false);
        setStars(numStars + 1);
      } else {
        setHasHalfStar(false);
        setStars(numStars);
      }
  }, [apiRating]);

  return (
    <div>
      {Array.from({ length: stars }, (_, index) => (
        <span key={index}><i class="fa-solid fa-star rating-color"></i></span>
      ))}
      
      {hasHalfStar && <span><i class="fa-regular rating-color fa-star-half-stroke"></i></span>}
      
    </div>
  );
};

export default RatingToStars;
