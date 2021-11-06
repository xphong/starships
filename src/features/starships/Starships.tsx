import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getStarships,
  selectStarships,
} from './starshipsSlice';
import styled from 'styled-components';
import emptyHeartIcon from '../../assets/icons/empty_heart.svg';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  background: #232524;
  padding: 24px;
  border-radius: 15px;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const CardImage = styled.div`
  position: relative;
`

const FavouriteIcon = styled.div`
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
`

function Starship(): React.ReactElement {
  const starships = useAppSelector(selectStarships);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getStarships());
  }, [])

  return (
    <ListContainer>
      {starships?.length > 0 && starships.map(starship => (
        <Card>
          <CardInfo>
            <h3>{starship.name}</h3>
            <span>{starship.manufacturer}</span>
            <div>{starship.hyperdrive_rating}</div>
            <span>{starship.passengers}</span>
          </CardInfo>
          <CardImage>
            <img src='/images/starship.png' />
            <FavouriteIcon>
              <img src={emptyHeartIcon} />
            </FavouriteIcon>
          </CardImage>
        </Card>
      ))}
    </ListContainer>
  );
}

export default Starship;