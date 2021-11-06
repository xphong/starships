import React from 'react';
import useStarships from './useStarships';
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
  const {
    starships,
    isLoadingStarships,
    isErrorStarships,
    previousStarships,
    nextStarships,
    dispatchGetStarshipsByPage,
  } = useStarships();

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
          onClick={() => dispatchGetStarshipsByPage(previousStarships)}
        >
          Previous Page
        </Button>
        <Button
          variant={Variant.secondary}
          disabled={!nextStarships}
          onClick={() => dispatchGetStarshipsByPage(nextStarships)}
        >
          Next Page
        </Button>
      </PaginationContainer>
    </>
  );
}

export default Starship;