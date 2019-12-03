import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormText, Label, Input, Button, Media, Alert } from 'reactstrap';

class AdminContact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      image: "",
      description: "",
      photo: undefined,
      saved: false,
      error: ""
    };
  }

  componentDidMount() {
    axios.get('api/users/contact/1').then(res => {
      this.setState({ name:res.data.name, email:res.data.email, image:res.data.image, description:res.data.description });
    }).catch(err => this.setState({ error: err.response.data, saved:false }) );
  }

  handleName = e => this.setState({ name: e.target.value, saved:false, error: "" });
  handleEmail = e => this.setState({ email: e.target.value, saved:false, error: "" });
  handleImage = e => this.setState({ image: e.target.value, photo: e.target.files[0], saved:false, error: "" });
  handleDescription = e => this.setState({ description: e.target.value, saved:false, error: "" });

  save = () => {
    const { name, email, description, photo } = this.state;

    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('description', description);
    if (photo) fd.append('image', photo);

    axios.put('/api/admin/contact/1', fd)
      .then(res => {
        console.log(res.data.image);
        this.setState({ name:res.data.name, email:res.data.email, image:res.data.image, description:res.data.description, saved:true, error: "" });
      }).catch(err => this.setState({ error: err.response.data, saved:false }) );
  }

  render() {
    const { name, email, image, description, photo, saved, error } = this.state;

    return (
      <Form className="mt-3">
        <FormGroup>
          <Label for="name">Nombre:</Label>
          <Input type="text" value={ name } onChange={ this.handleName } />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email:</Label>
          <Input type="email" value={ email } onChange={ this.handleEmail } />
        </FormGroup>
        
        <FormGroup>
          <Label for="description">Descripción:</Label>
          <Input type="textarea" value={ description } onChange={ this.handleDescription } style={{height: 200}}/>
        </FormGroup>

        <FormGroup>
          <Label>Foto: { image.split(/\\|\//).pop() }</Label>
          <Media className="m-1 justify-content-center">
            <img src={ image } alt="" style={{height: 100, width: 80}}/>
          </Media>
          <Input type="file" files={ [photo] } onChange={ this.handleImage } />
        </FormGroup>
        
        { error.length > 0 && <Alert color="danger">{ error }</Alert> }
        { saved && <Alert color="success">Se ha guardado la información.</Alert> }
        
        <Button onClick={ this.save }>Guardar</Button>
        <FormText>*Los campos que dejes en blanco al guardar, seran eliminados.</FormText>
      </Form>
    )
  }
}

export default AdminContact;