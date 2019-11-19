import React from "react";
import styled from "styled-components";

import NavBar from "../components/NavBar.js";
import "./Settings.css";

const Image = styled.div`
  background-image: url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  height: 200px;
  width: 150px;
  justify-content: bottom;
  align-items: bottom;
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Carlos Herrero",
      email: "example@gmail.com",
      descripcion: "lorem ipsu",
      imageUrl: "https://picsum.photos/150/200",
      title: "",
      description: ""
    };
  }

  handleSubmit = event => {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  };

  handleName = event => {
    this.setState({ contact_name: event.target.value });
  };

  handleEmail = event => {
    this.setState({ contact_email: event.target.value });
  };

  handleMessage = event => {
    this.setState({ contact_message: event.target.value });
  };

  render() {
    return (
      <div className="Settings">
        <NavBar />
        <div className="Main">

          <div className="Part">
            <form className="Form" onSubmit={this.handleSubmit}>
              <h3 className="Title">Contacto</h3><br /><br />
              
              <div className="ImageCenter">
                <Image imageUrl={this.state.imageUrl}>
                  <div className="SelectImage"><label className="Name">Seleccionar</label></div>
                </Image>
              </div><br /><br />

              <label>Nombre:</label><br />
              <input className="Text" type="text" value={this.state.contact_name} onChange={this.handleName} />
              <br /><br />

              <label>Email:</label><br />
              <input className="Text" type="email" value={this.state.contact_email} onChange={this.handleEmail} />
              <br /><br />

              <label>Descripcion:</label><br />
              <textarea className="Message" value={this.state.contact_message} onChange={this.handleMessage} />
              <br /><br />

              <input type="submit" value="Guardar" />
            </form>
          </div>

          <div className="Part">
            <form className="Form" onSubmit={this.handleSubmit}>
              <h3 className="Title">Inicio</h3><br /><br />

              <div className="ImageCenter">
                <Image imageUrl={this.state.imageUrl}>
                  <div className="SelectImage"><label className="Name">Seleccionar</label></div>
                </Image>
              </div><br /><br />

              <label>Titulo:</label><br />
              <input className="Text" type="text" value={this.state.contact_name} onChange={this.handleName} />
              <br /><br />

              <label>Descripcion:</label><br />
              <textarea className="Message" value={this.state.contact_message} onChange={this.handleMessage} />
              <br /><br />

              <input type="submit" value="Guardar" />
            </form>
          </div>

          <div className="Part">
            <form className="Form" onSubmit={this.handleSubmit}>
              <h3 className="Title">Administrar eventos</h3>
              <br /><br />

              <label>Titulo:</label><br />
              <input className="Text" type="text" value={this.state.contact_name} onChange={this.handleName} />
              <br /><br />

              <label>Fecha:</label><br />
              <input className="Text" type="date" value={this.state.contact_name} onChange={this.handleName} />
              <br /><br />

              <label>Selecciona evento:</label><br />
              <select className="SelectionList">
                <option selected value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
              <br /><br />

              <input type="submit" value="Crear" />
              <input type="submit" value="Modificar" />
              <input type="submit" value="Eliminar" />
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default Settings;
