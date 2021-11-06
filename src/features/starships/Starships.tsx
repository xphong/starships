import React, { useEffect } from 'react';
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
import Button, { Variant } from '../../components/Button/Button';
import ListContainer from '../../components/ListContainer/ListContainer';
import StarshipCard from '../../components/StarshipCard/StarshipCard';

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
  }, [dispatch]);

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
            <StarshipCard key={starship.name} starship={starship} />
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