import React from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';
import emptyHeartIcon from '../../assets/icons/empty_heart.svg';
import { Starship } from '../../features/starships/starshipsSlice';

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
        <FavoriteIcon>
          <img src={emptyHeartIcon} />
        </FavoriteIcon>
      </StarshipCardImage>
    </Card>
  );
}