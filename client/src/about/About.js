import React from 'react';

import NavBar from '../components/NavBar.js';
import ContactInfo from '../components/ContactInfo.js';
import Contact from '../components/Contact.js';
import './About.css';

function About() {
  return (
    <div className="About">
      <NavBar/>
      <div className="Main">
        <ContactInfo />
        <Contact />
      </div>
    </div>
  );
}

export default About;