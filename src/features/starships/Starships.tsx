import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getStarships,
  selectStarships,
} from './starshipsSlice';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
`

function Starship(): React.ReactElement {
  const starships = useAppSelector(selectStarships);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getStarships());
  }, [])

  console.log('starships', starships)

  return (
    <div>
      {starships?.length > 0 && starships.map(starship => (
        <Card>
          <div>{starship.name}</div>
        </Card>
      ))}
    </div>
  );
}

export default Starship;