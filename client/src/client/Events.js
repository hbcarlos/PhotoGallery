import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import AppNavBar from '../components/AppNavBar.js';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
        title:'Eventos',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  }

  render() {
    return (
      <div>
        <AppNavBar/>
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">{this.state.title}</h1>
              <p className="lead">{this.state.description}</p>
            </Container>
          </Jumbotron>
          </div>
      </div>
    )
  }
}

export default Events;