import styled from 'styled-components';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default ListContainer;