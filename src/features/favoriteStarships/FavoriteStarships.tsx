import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectFavoriteStarships
} from './favoriteStarshipsSlice';
import ListContainer from '../../components/ListContainer/ListContainer';
import StarshipCard, { Variant } from '../../components/StarshipCard/StarshipCard';

function FavoriteStarships(): React.ReactElement {
  const favoriteStarships = useAppSelector(selectFavoriteStarships);

  return (
    <>
      <ListContainer>
        {favoriteStarships.length > 0 ? (
          favoriteStarships.map(favoriteStarships => (
            <StarshipCard key={favoriteStarships.name} starship={favoriteStarships} variant={Variant.favorite} />
          ))
        ) : 'No favorite starships found!'}
      </ListContainer>
    </>
  );
}

export default FavoriteStarships;