import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Container from '../components/Container/Container';
import FavoriteStarships from '../features/favoriteStarships/FavoriteStarships';

export default function Favorites() {
  return (
    <>
      <NavBar />
      <Container>
        <h1>Favorites</h1>
        <FavoriteStarships />
      </Container>
    </>
  );
}