import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
  padding: 30px;
`

export default function NavBar(): React.ReactElement {
  return (
    <Nav>
      <Link to="/">Starship List</Link> |{" "}
      <Link to="/favorites">View Favorites</Link>
    </Nav>
  );
}