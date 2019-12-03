import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

class AdminAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      newpass: "",
      reppass: "",
      savedUser: false,
      errorUser: "",
      save: true,
      savedPass: false,
      errorPass: ""
    };
  }

  componentDidMount() {
    axios.get('api/admin/account/1').then(res => {
      this.setState({ username:res.data.username });
    }).catch(err => this.setState({ error: err.response.data }) );
  }

  validate(password, newpass, reppass) {
    let save = true, errorPass = "";

    if (newpass.length > 5) save = false;
    else errorPass = "La nueva contraseña debe tener almenos 6 caracteres."

    if (newpass === reppass) save = false;
    else errorPass = "Las contraseñas no coinciden."

    if (password && newpass && reppass) save = false;
    else save = true;

    this.setState({ password:password, newpass:newpass, reppass:reppass, save:save, savedPass:false , errorPass:errorPass });
  }

  handleUsername = e => {
    let error = "";
    if (!e.target.value) error = "Debes ingresar un nombre de usuario.";
    this.setState({ username:e.target.value, savedUser:false, errorUser:error });
  }
  handlePassword = e => this.validate( e.target.value, this.state.newpass, this.state.reppass );
  handleNewPass = e => this.validate( this.state.password, e.target.value, this.state.reppass );
  handleRepPass = e => this.validate( this.state.password, this.state.newpass, e.target.value );

  saveUsername = () => {
    const { username } = this.state;

    axios.put('/api/admin/account/1', { username:username })
      .then(res => {
        this.setState({ username:res.data.username, savedUser:true, errorUser: "" });
      }).catch(err => this.setState({ errorUser:err.response.data, savedUser:false }) );
  }

  savePassword = () => {
    const { password, newpass } = this.state;

    axios.put('/api/admin/password/1', { password:password, newpass:newpass })
      .then(res => {
        this.setState({ password:"", newpass:"", reppass:"", savedPass:true, errorPass: "" });
      }).catch(err => this.setState({ errorPass:err.response.data, savedPass:false }) );
  }

  render() {
    const { username, savedUser, errorUser, password, newpass, reppass, save, savedPass, errorPass } = this.state;

    return (
      <Form className="mt-3">
        <FormGroup>
          <Label>Nombre de usuario:</Label>
          <Input type="username" value={ username } onChange={ this.handleUsername } />
        </FormGroup>

        { errorUser.length > 0 && <Alert color="danger">{ errorUser }</Alert> }
        { savedUser && <Alert color="success">Se ha guardado el nombre de usuario.</Alert> }

        <Button onClick={ this.saveUsername } disabled={ errorUser ? true : false }>Guardar</Button>
        <hr className="my-2" />

        <FormGroup>
          <Label>Contraseña actual:</Label>
          <Input type="password" value={ password } onChange={ this.handlePassword } />
        </FormGroup>

        <FormGroup>
          <Label>Nueva contraseña:</Label>
          <Input type="password" value={ newpass } onChange={ this.handleNewPass } />
        </FormGroup>
        
        <FormGroup>
          <Label>Repite la contraseña:</Label>
          <Input type="password" value={ reppass } onChange={ this.handleRepPass }/>
        </FormGroup>

        { errorPass.length > 0 && <Alert color="danger">{ errorPass }</Alert> }
        { savedPass && <Alert color="success">Se ha guardado la contraseña.</Alert> }

        <Button onClick={ this.savePassword } disabled={ save }>Guardar</Button>
      </Form>
    )
  }
}

export default AdminAccount;