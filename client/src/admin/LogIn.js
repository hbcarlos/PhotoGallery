import React, { Component } from 'react';
import { Jumbotron, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class LogIn extends Component {

  render() {
    return (
      <Container className="d-flex align-items-center justify-content-center">
        <Jumbotron className="m-4" style={{width: "50%", minWidth: 300, maxWidth: 400}}>
          <h4 className="display-4">Sing In</h4>
          <hr className="my-2" />
          <p className="lead">No necesitas registrarte para navegar por esta web, este pagina es solo para los administradores de la web.</p>
          
          <Form className="mt-3">
            <FormGroup>
              <Label for="user">Usuario</Label>
              <Input type="text" name="user" id="user" placeholder="usuario" />
            </FormGroup>
            
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="password" />
            </FormGroup>

            <Button >Aceptar</Button>
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}

export default LogIn;