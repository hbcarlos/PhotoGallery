import React from 'react';

import NavBar from '../components/NavBar.js';
import PreViewEvent from '../components/PreViewEvent.js';
import GalleryEvent from '../components/GalleryEvent.js';
import './Events.css';

class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        events: ['evento1','evento2','evento3','evento4','evento5']
    }
  }

  listEvents() {
    const listItems = this.state.events.map((events) =>
      <div className="Row">
        <PreViewEvent/>
        <PreViewEvent/>
        <PreViewEvent/>
        <PreViewEvent/>
      </div>
    );
    return listItems;
  }

  render() {
    return (
      <div className="Events">
        <NavBar/>
        <div className="Main">
          {//this.listEvents()
          }
          <GalleryEvent/>
        </div>
      </div>
    )
  }
}

export default Events;