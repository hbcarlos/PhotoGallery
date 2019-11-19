import React from 'react';
import styled from 'styled-components';

import NavBar from '../components/NavBar.js';
import LastEvents from '../components/LastEvents.js';
import './Home.css';

const Info = styled.div`
    height: fit;
    width: 75%;
    padding: 10px;
    text-align: left;
`;

const Title = styled.h2`
    margin: 0px;
    margin-bottom: 5px;
`;

const Text = styled.label``;

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        title:'Lorem ipsum',
        descripcion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  }

  render() {
    return (
      <div className="Home">
        <NavBar/>
        <div className="Main">
          <Info>
            <Title>{this.state.title}</Title>
            <Text>{this.state.descripcion}</Text>  
          </Info>
          <LastEvents />
        </div>
      </div>
    )
  }
}

export default Home;