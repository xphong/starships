import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styled from 'styled-components';
import Card from '../Card/Card';
import emptyHeartIcon from '../../assets/icons/empty_heart.svg';
import fullHeartIcon from '../../assets/icons/full_heart.svg';
import { Starship } from '../../features/starships/starshipsSlice';
import {
  addFavoriteStarship,
  removeFavoriteStarship,
  selectFavoriteStarships,
} from '../../features/favoriteStarships/favoriteStarshipsSlice';

interface StarshipCardProps {
  starship: Starship
};

const StarshipCardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StarshipCardImage = styled.div`
  position: relative;
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #212423;
  border-radius: 50%;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function StarshipCard({ starship }: StarshipCardProps): React.ReactElement {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const favoriteStarships = useAppSelector(selectFavoriteStarships);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (favoriteStarships.find((favoriteStarship) => favoriteStarship.name === starship.name)) {
      setIsFavorite(true);
    }
  }, [favoriteStarships, starship]);

  const handleFavoriteClick = (): void => {
    if (isFavorite) {
      dispatch(removeFavoriteStarship(starship.name));
    } else {
      dispatch(addFavoriteStarship(starship));
    }

    setIsFavorite(!isFavorite)
  }

  return (
    <Card>
      <StarshipCardInfo>
        <h3>{starship.name}</h3>
        <span>{starship.manufacturer}</span>
        <div>{starship.hyperdrive_rating}</div>
        <span>{starship.passengers}</span>
      </StarshipCardInfo>
      <StarshipCardImage>
        <img src='/images/starship.png' />
        <FavoriteIcon onClick={handleFavoriteClick}>
          {isFavorite ? (
            <img src={fullHeartIcon} />
          ) : (
            <img src={emptyHeartIcon} />
          )}
        </FavoriteIcon>
      </StarshipCardImage>
    </Card>
  );
}