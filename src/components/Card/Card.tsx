import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children?: React.ReactNode
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #232524;
  padding: 24px;
  border-radius: 15px;
`;

export default function Card({ children }: CardProps): React.ReactElement {
  return (
    <StyledCard>
      {children}
    </StyledCard>
  );
}