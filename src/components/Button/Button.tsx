import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children?: React.ReactNode
  variant: Variant
  disabled?: boolean
};

export enum Variant {
  primary = 'primary',
  secondary = 'secondary',
};

const variantOptions = {
  primary: {
    fontSize: '24px',
    color: '#FF6871',
    background: '#212423',

  },
  secondary: {
    fontSize: '12px',
    color: '#FFFFFF',
    background: '#232524'
  },
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  padding: 10px;

  ${({ variant }) =>
    variant &&
    variantOptions[variant] &&
    css`
     font-size: ${variantOptions[variant].fontSize};
     color: ${variantOptions[variant].color};
     background: ${variantOptions[variant].background};
 `}

  ${({ disabled }) =>
    disabled &&
    css`
    opacity: 0.5;
    background: transparent;
  `}
`;

export default function Button({ children, variant = Variant.primary, disabled }: ButtonProps): React.ReactElement {
  return (
    <StyledButton variant={variant} disabled={disabled}>
      {children}
    </StyledButton>
  );
}