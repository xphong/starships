import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getStarshipsByPage,
  selectStarships,
  selectStarshipsLoading,
  selectStarshipsError,
  selectStarshipsPrevious,
  selectStarshipsNext,
} from './favoriteStarshipsSlice';
import ListContainer from '../../components/ListContainer/ListContainer';
import StarshipCard from '../../components/StarshipCard/StarshipCard';

function FavoriteStarships(): React.ReactElement {
  const starships = useAppSelector(selectStarships);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getStarshipsByPage());
  }, []);

  return (
    <>
      <ListContainer>
        {starships.length > 0 ? (
          starships.map(starship => (
            <StarshipCard key={starship.name} starship={starship} />
          ))
        ) : 'No favorite starships found!'}
      </ListContainer>
    </>
  );
}

export default FavoriteStarships;