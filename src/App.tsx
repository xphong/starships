import React from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import Starships from './features/starships/Starships'

function App(): React.ReactElement {
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

export default App;