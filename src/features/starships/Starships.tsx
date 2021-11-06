import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getStarshipsByPage,
  selectStarships,
  selectStarshipsLoading,
  selectStarshipsError,
  selectStarshipsPrevious,
  selectStarshipsNext,
} from './starshipsSlice';
import styled from 'styled-components';
import emptyHeartIcon from '../../assets/icons/empty_heart.svg';
import Button, { Variant } from '../../components/Button/Button'

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
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px auto;
  width: 200px;
`

function Starship(): React.ReactElement {
  const starships = useAppSelector(selectStarships);
  const isLoadingStarships = useAppSelector(selectStarshipsLoading);
  const isErrorStarships = useAppSelector(selectStarshipsError);
  const previousStarships = useAppSelector(selectStarshipsPrevious);
  const nextStarships = useAppSelector(selectStarshipsNext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getStarshipsByPage());
  }, []);

  if (isLoadingStarships) {
    return <div>Loading...</div>
  }

  if (isErrorStarships) {
    return <div>Error fetching starships!</div>
  }

  return (
    <>
      <ListContainer>
        {starships.length > 0 ? (
          starships.map(starship => (
            <Card>
              <CardInfo>
                <h3>{starship.name}</h3>
                <span>{starship.manufacturer}</span>
                <div>{starship.hyperdrive_rating}</div>
                <span>{starship.passengers}</span>
              </CardInfo>
              <CardImage>
                <img src='/images/starship.png' />
                <FavoriteIcon>
                  <img src={emptyHeartIcon} />
                </FavoriteIcon>
              </CardImage>
            </Card>
          ))
        ) : 'No starships found!'}
      </ListContainer>
      <PaginationContainer>
        <Button
          variant={Variant.secondary}
          disabled={!previousStarships}
          onClick={() => void dispatch(getStarshipsByPage(previousStarships))}
        >
          Previous Page
        </Button>
        <Button
          variant={Variant.secondary}
          disabled={!nextStarships}
          onClick={() => void dispatch(getStarshipsByPage(nextStarships))}
        >
          Next Page
        </Button>
      </PaginationContainer>
    </>
  );
}

export default Starship;