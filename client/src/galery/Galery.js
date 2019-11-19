import React from 'react';

import NavBar from '../components/NavBar.js';
import PreViewGallery from '../components/PreViewGallery.js';
import './Galery.css';

class Galery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        galleries: ['evento1','evento2','evento3','evento4','evento5']
    }
  }

  listGalleries() {
    const listItems = this.state.galleries.map((galleries) =>
      <div className="Row">
        <PreViewGallery/>
        <PreViewGallery/>
        <PreViewGallery/>
        <PreViewGallery/>
      </div>
    );
    return listItems;
  }

  render() {
    return (
      <div className="Galery">
        <NavBar/>
        <div className="Main">
          {this.listGalleries()}
        </div>
      </div>
    )
  }
}

export default Galery;