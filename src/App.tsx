import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import Starships from './features/starships/Starships'

export default function App(): React.ReactElement {
  return (
    <>
      <NavBar />
      <Container>
        <h1>Starship List</h1>
        <Starships />
      </Container>
    </>
  );
}
