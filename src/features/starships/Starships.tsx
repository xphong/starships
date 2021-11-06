import React from 'react';
import useStarships from './useStarships';
import ListContainer from '../../components/ListContainer/ListContainer';
import StarshipCard from '../../components/StarshipCard/StarshipCard';
import Pagination from '../../components/Pagination/Pagination';

export default function Starship(): React.ReactElement {
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
      <Pagination
        isPreviousDisabled={!previousStarships}
        onPreviousClick={() => dispatchGetStarshipsByPage(previousStarships)}
        isNextDisabled={!nextStarships}
        onNextClick={() => dispatchGetStarshipsByPage(nextStarships)}
      />
    </>
  );
}