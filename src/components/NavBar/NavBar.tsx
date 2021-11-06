import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button/Button';

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function NavBar(): React.ReactElement {
  return (
    <Nav>
      <Link to="/">
        <img src='/images/home_logo.png' />
      </Link>
      <Link to="/favorites">
        <Button>View Favorites</Button>
      </Link>
    </Nav>
  );
}