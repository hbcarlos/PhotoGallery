import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormText, Label, Input, Button, Alert, Media } from 'reactstrap';

class AdminGalleries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: { id: 0, name: "", cover: "" },
      name: "",
      url: "",
      photo: undefined,
      galleries: [],
      error: "",
      errors: {create: true, update: true, del: true }
    }
  }

  componentDidMount() {
    axios.get('/api/galleries')
    .then(res => {
      const galleries = res.data;
      galleries.unshift(this.state.selected);
      this.setState({ galleries: galleries });
    })
    .catch(err => this.setState({ error: err.response.data }) );
  }

  validate(selected, name, url, photo) {
    const errors = { create: true, update: true, del: true };
    
    if (name && photo) errors.create = false;
    else errors.create = true;

    if (selected.id !== 0 && name && photo) errors.update = false;
    else errors.update = true;

    if (selected.id !== 0) errors.del = false;
    else errors.del = true;

    this.setState({ selected: selected, name: name, url: url, photo: photo, error: "", errors: errors });
  }

  handleSelect = e => {
    this.state.galleries.forEach(gallery => {
      if ( gallery.id === parseInt(e.target.value) ) {
        this.validate(gallery, this.state.name, this.state.url, this.state.photo);
      }
    });
  };

  handleName = e => this.validate(this.state.selected, e.target.value, this.state.url, this.state.photo);
  handleCover = e => this.validate(this.state.selected, this.state.name, e.target.value, e.target.files[0]);

  createGallery = () => {
    const { name, photo, galleries } = this.state;

    const fd = new FormData();
    fd.append('name', name);
    fd.append('cover', photo);

    axios.post('/api/galleries/', fd)
      .then(res => {
        galleries.push(res.data);
        this.validate(res.data, "", "", undefined);
      }).catch(err => this.setState({ error: err.response.data }) );
  }

  updateGallery = () => {
    const { selected, name, photo, galleries } = this.state;
    
    const fd = new FormData();
    fd.append('name', name);
    fd.append('cover', photo);

    axios.put(`/api/galleries/${selected.id}`, fd)
      .then(res => {
        for (let i=0; i<galleries.length; i++) {
          if (galleries[i].id === parseInt(res.data.id)) {
            galleries[i].name = res.data.name;
            galleries[i].cover = res.data.cover;
            this.validate(galleries[i], "", "", undefined);
            break;
          }
        }
      })
      .catch(err => this.setState({ error: err.response.data }) );
  }

  deleteGallery = () => {
    const { selected, galleries } = this.state;

    axios.delete(`/api/galleries/${selected.id}`)
      .then(res => {
        for (let i=0; i<galleries.length; i++) {
          if (galleries[i].id === parseInt(res.data.id)) {
            galleries.splice(i, 1);
            break;
          }
        }
        this.validate({ id: 0, name: "", cover: "" }, "", "", undefined);
      })
      .catch(err => this.setState({ error: err.response.data }) );
  }

  render() {
    const { selected, name, url, photo, galleries, error, errors } = this.state;
    const { create, update, del } = errors;
    
    return (
      <Form className="mt-3">
        <FormGroup>
          <Label>Galeria:</Label>
          <Input type="select" name="selected" value={ selected.id } onChange={ this.handleSelect } >
            { galleries.map( gallery => <option key={gallery.id} value={gallery.id}>{gallery.name}</option> ) }
          </Input>
          <FormText>Selecciona una galeria para actualizarla o eliminarla.</FormText>
        </FormGroup>

        <FormGroup>
          <Label>Nombre: { selected.name }</Label>
          <Input type="text" value={ name } onChange={ this.handleName } placeholder="nombre" />
        </FormGroup>

        <FormGroup>
          <Label>Portada: { selected.cover.split('/').pop() }</Label>
          <Media className="m-1 justify-content-center">
            <img src={selected.cover} alt="" style={{height: 100, width: 80}}/>
          </Media>
          <Input type="file" value={ url } files={ [photo] } onChange={ this.handleCover }/>
        </FormGroup>
        
        { error.length > 0 && <Alert color="danger">{ error }</Alert> }

        <Button className="m-2" onClick={ this.createGallery } disabled={create}>Crear</Button>
        <Button className="m-2" onClick={ this.updateGallery } disabled={update}>Actualizar</Button>
        <Button className="m-2" onClick={ this.deleteGallery } disabled={del}>Eliminar</Button>
        <FormText>*Para crear una galeria debes indicar nombre y portada.</FormText>
        <FormText>*Para actualizar una galeria debes seleccionar una galeria e indicar nombre y portada.</FormText>
        <FormText>*Para eliminar una galeria debes seleccionarla primero.</FormText>
      </Form>
    );
  }
}

export default AdminGalleries;