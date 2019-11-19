import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Main = styled.div`
  background-color: #20232a;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
`;

const IconButton = styled.button`
  background-image: url("https://picsum.photos/50/50");
  background-size: auto;
  height: 40px;
  width: 40px;
  border: none;
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const NavButton = styled.button`
  background-color: #20232a;
  height: 40px;
  width: fit;
  border: none;
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Main>
        <Link to="/"><IconButton></IconButton></Link>
        <Link to="/events"><NavButton>Eventos</NavButton></Link>
        <Link to="/galery"><NavButton>Galeria</NavButton></Link>
        <Link to="/about"><NavButton>Contacto</NavButton></Link>
        <Link to="/settings"><NavButton>Admin</NavButton></Link>
      </Main>
    );
  }
}

export default NavBar;
