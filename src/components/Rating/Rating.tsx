import React from 'react';
import fullStarIcon from '../../assets/icons/full_star.svg';
import halfStarIcon from '../../assets/icons/half_star.svg';

interface RatingProps {
  rating: number;
}

export default function Rating({ rating }: RatingProps): React.ReactElement {
  if (isNaN(rating)) {
    return <></>;
  }

  const ceiledRating = Math.ceil(rating);

  return (
    <div>
      {Array.from(Array(ceiledRating).keys()).map(() => (
        <img src={fullStarIcon} alt='Full rating icon' />
      ))}
      {rating % 1 !== 0 && <img src={halfStarIcon} alt='Half rating icon' />}
    </div>
  );
}