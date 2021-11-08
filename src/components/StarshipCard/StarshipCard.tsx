import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styled, { keyframes } from 'styled-components';
import Card from '../Card/Card';
import emptyHeartIcon from '../../assets/icons/empty_heart.svg';
import fullHeartIcon from '../../assets/icons/full_heart.svg';
import { Starship } from '../../features/starships/starshipsSlice';
import { FavoriteStarship } from '../../features/favoriteStarships/favoriteStarshipsSlice'
import {
  addFavoriteStarship,
  removeFavoriteStarship,
  selectFavoriteStarships,
  updateFavoriteStarshipNote,
} from '../../features/favoriteStarships/favoriteStarshipsSlice';
import useDebounce from '../../hooks/useDebounce'
import Rating from '../Rating/Rating'

export enum Variant {
  primary = 'primary',
  favorite = 'favorite',
};

interface StarshipCardProps {
  starship: FavoriteStarship;
  variant?: Variant;
};

const StarshipCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  animation: fadeInAnimation 1s linear;
`

const StarshipCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-evenly;
`;

const StarshipCardImage = styled.div`
  position: relative;
`;

const StarshipHeading = styled.h2`
  font-family: Helvetica;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`

const StarshipText = styled.p`
  font-family: Helvetica;
  font-size: 18px;
  line-height: 21px;
  margin: 0;
`

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

const NotesTextbox = styled.textarea`
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: text;
  margin-top: 10px;
  resize: none;
  padding: 10px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
`

export default function StarshipCard({ starship, variant = Variant.primary }: StarshipCardProps): React.ReactElement {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);
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

    setIsFavorite(!isFavorite);
  }

  const handleNotesChange = useDebounce(
    (starship: Starship): void => {
      const starshipWithNote: FavoriteStarship = {
        ...starship,
        note: notesRef.current?.value,
      };

      dispatch(updateFavoriteStarshipNote(starshipWithNote));
    },
    500
  );

  return (
    <Card>
      <StarshipCardContainer>
        <StarshipCardInfo>
          <StarshipHeading>{starship.name}</StarshipHeading>
          <StarshipText>{starship.manufacturer}</StarshipText>
          {starship.hyperdrive_rating && <Rating rating={Number(starship.hyperdrive_rating)} />}
          <StarshipText>Passengers: {starship.passengers}</StarshipText>
        </StarshipCardInfo>
        <StarshipCardImage>
          <img src='/images/starship.png' alt='Starship' />
          <FavoriteIcon onClick={handleFavoriteClick}>
            {isFavorite ? (
              <img src={fullHeartIcon} alt='Favorite icon when favorited' />
            ) : (
              <img src={emptyHeartIcon} alt='Favorite icon when not favorited' />
            )}
          </FavoriteIcon>
        </StarshipCardImage>
      </StarshipCardContainer>
      {variant === Variant.favorite && (
        <NotesTextbox
          ref={notesRef}
          placeholder='Add text'
          defaultValue={starship.note}
          onChange={() => handleNotesChange(starship)}
        />
      )}
    </Card>
  );
}