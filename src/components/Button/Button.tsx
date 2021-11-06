import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #212423;
  border-radius: 20px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #FF6871;
  cursor: pointer;
  padding: 10px;
`;

interface ButtonProps {
  children: React.ReactNode
}

export default function Button({ children }: ButtonProps): React.ReactElement {
  return (
    <StyledButton>
      {children}
    </StyledButton>
  );
}