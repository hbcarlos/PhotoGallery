import React from 'react';
import styled from "styled-components";

import NavBar from '../components/NavBar.js';

const Main = styled.div`
  height: fit;
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

class Page404 extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Main>
          <h1> Error 404: Page not founafsdfdsafsad</h1>
          <h2> La ruta a la que intentas acceder no existe.</h2>
        </Main>
      </div>
    );
  }
}

export default Page404;