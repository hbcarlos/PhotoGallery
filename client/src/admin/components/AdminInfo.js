import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormText, Label, Input, Button, Alert } from 'reactstrap';

class AdminInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      instagram: "",
      facebook: "",
      info: "",
      saved: false,
      error: ""
    };
  }

  componentDidMount() {
    axios.get('api/users/info/1').then(res => {
      this.setState({ title:res.data.title, instagram:res.data.instagram, facebook:res.data.facebook, info:res.data.info });
    }).catch(err => this.setState({ error: err.response.data, saved:false }) );
  }

  handleTitle = e => this.setState({ title: e.target.value, saved:false, error: "" });
  handleInstagram = e => this.setState({ instagram: e.target.value, saved:false, error: "" });
  handleFacebook = e => this.setState({ facebook: e.target.value, saved:false, error: "" });
  handleInfo = e => this.setState({ info: e.target.value, saved:false, error: "" });

  save = () => {
    const { title, instagram, facebook, info } = this.state;

    axios.put('/api/admin/info/1', { title:title, instagram:instagram, facebook:facebook, info:info })
      .then(res => {
        this.setState({ title:res.data.title, instagram:res.data.instagram, facebook:res.data.facebook, info:res.data.info, saved:true, error: "" });
      }).catch(err => this.setState({ error: err.response.data, saved:false }) );
  }

  render() {
    const { title, instagram, facebook, info, saved, error } = this.state;

    return (
      <Form className="mt-3">
        <FormGroup>
          <Label for="title">Titulo:</Label>
          <Input type="text" value={ title } onChange={ this.handleTitle } />
        </FormGroup>

        <FormGroup>
          <Label for="instagram">Link instagram:</Label>
          <Input type="text" value={ instagram } onChange={ this.handleInstagram } />
        </FormGroup>

        <FormGroup>
          <Label for="facebook">Link facebook:</Label>
          <Input type="text" value={ facebook } onChange={ this.handleFacebook } />
        </FormGroup>
        
        <FormGroup>
          <Label for="info">Descripción</Label>
          <Input type="textarea" value={ info } onChange={ this.handleInfo } style={{height: 200}}/>
        </FormGroup>

        { error.length > 0 && <Alert color="danger">{ error }</Alert> }
        { saved && <Alert color="success">Se ha guardado la información.</Alert> }

        <Button onClick={ this.save }>Guardar</Button>
        <FormText>*Los campos que dejes en blanco al guardar, seran eliminados.</FormText>
      </Form>
    )
  }
}

export default AdminInfo;