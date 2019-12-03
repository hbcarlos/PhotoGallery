import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import AppNavBar from './AppNavBar.js';

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <AppNavBar/>
        <Jumbotron className="m-4" style={{minWidth: 300}}>
          <h1 className="display-3">Página no disponible</h1>
          <hr className="my-2" />
          <p className="lead">Lo sentimos pero no se ha podido encontrar la página que busca.</p>
        </Jumbotron>
      </div>
    );
  }
}

export default PageNotFound;