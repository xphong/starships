import React from 'react';
import styled from 'styled-components';
import Button, { Variant } from '../Button/Button';

interface PaginationProps {
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px auto;
  width: 200px;
`

export default function Pagination({
  isPreviousDisabled,
  isNextDisabled,
  onPreviousClick,
  onNextClick,
}: PaginationProps): React.ReactElement {
  return (
    <PaginationContainer>
      <Button
        variant={Variant.secondary}
        disabled={isPreviousDisabled}
        onClick={onPreviousClick}
      >
        Previous Page
      </Button>
      <Button
        variant={Variant.secondary}
        disabled={isNextDisabled}
        onClick={onNextClick}
      >
        Next Page
      </Button>
    </PaginationContainer>
  );
}