import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container, Media } from 'reactstrap';
import facebook from '../img/facebook.png';
import instagram from '../img/instagram.png';
import admin from '../img/admin.png';

class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLogged: true
    };
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" style={{minWidth: 350}}>
          <Container>
            <Link to="/" className="text-white font-weight-bold" style={{textDecoration: "none"}}>PhotoGallery</Link>
            <NavbarToggler onClick={this.toggle} />
            
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-1" navbar>
                <Link to="/events" style={{textDecoration: "none"}}><NavItem className="m-2 text-white">Eventos</NavItem></Link>
                <Link to="/galleries" style={{textDecoration: "none"}}><NavItem className="m-2 text-white">Galería</NavItem></Link>
                <Link to="/about" style={{textDecoration: "none"}}><NavItem className="m-2 text-white">Contacto</NavItem></Link>
              </Nav>
            </Collapse>
            
            <Media href='https://instagram.com' className="m-1">
              <img src={instagram} alt="" style={{height: 30, width: 30}}/>
            </Media>
            <Media href='https://facebook.com' className="m-1">
              <img src={facebook} alt="" style={{height: 30, width: 30}}/>
            </Media>
            <Link to="/admin" style={{textDecoration: "none"}}>
              <Media className="m-1"> <img src={admin} alt="" style={{height: 30, width: 30}}/> </Media>
            </Link>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavBar;
