import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormText, Label, Input, Button, Alert, Media } from 'reactstrap';

class AdminEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: { id: 0, name: "", date: "", cover: "" },
      name: "",
      date: "",
      url: "",
      photo: undefined,
      events: [],
      error: "",
      errors: {create: true, update: true, del: true }
    }
  }

  componentDidMount() {
    axios.get('/api/events')
    .then(res => {
      const events = res.data;
      events.unshift(this.state.selected);
      this.setState({ events: events });
    })
    .catch(err => this.setState({ error: err.response.data }) );
  }

  validate(selected, name, date, url, photo) {
    const errors = { create: true, update: true, del: true };
    
    if (name && date && photo) errors.create = false;
    else errors.create = true;

    if (selected.id !== 0 && name && date && photo) errors.update = false;
    else errors.update = true;

    if (selected.id !== 0) errors.del = false;
    else errors.del = true;

    this.setState({ selected: selected, name: name, date: date, url: url, photo: photo, error: "", errors: errors });
  }

  handleSelect = e => {
    this.state.events.forEach(event => {
      if ( event.id === parseInt(e.target.value) ) {
        this.validate(event, this.state.name, this.state.date, this.state.url, this.state.photo);
      }
    });
  };

  handleName = e => this.validate(this.state.selected, e.target.value, this.state.date, this.state.url, this.state.photo);
  handleDate = e => this.validate(this.state.selected, this.state.name, e.target.value, this.state.url, this.state.photo);
  handleCover = e => this.validate(this.state.selected, this.state.name, this.state.date, e.target.value, e.target.files[0]);

  createEvent = () => {
    const { name, date, photo, events } = this.state;

    const fd = new FormData();
    fd.append('name', name);
    fd.append('date', date);
    fd.append('cover', photo);

    axios.post('/api/events/', fd)
      .then(res => {
        events.push(res.data);
        this.validate(res.data, "", "", "", undefined);
      }).catch(err => this.setState({ error: err.response.data }) );
  }

  updateEvent = () => {
    const { selected, name, date, photo, events } = this.state;
    
    const fd = new FormData();
    fd.append('name', name);
    fd.append('date', date);
    fd.append('cover', photo);

    axios.put(`/api/events/${selected.id}`, fd)
      .then(res => {
        for (let i=0; i<events.length; i++) {
          if (events[i].id === parseInt(res.data.id)) {
            events[i].name = res.data.name;
            events[i].date = res.data.date;
            events[i].cover = res.data.cover;
            this.validate(events[i], "", "", "", undefined);
            break;
          }
        }
      })
      .catch(err => this.setState({ error: err.response.data }) );
  }

  deleteEvent = () => {
    const { selected, events } = this.state;

    axios.delete(`/api/events/${selected.id}`)
      .then(res => {
        for (let i=0; i<events.length; i++) {
          if (events[i].id === parseInt(res.data.id)) {
            events.splice(i, 1);
            break;
          }
        }
        this.validate({ id: 0, name: "", date: "", cover: "" }, "", "", "", undefined);
      })
      .catch(err => this.setState({ error: err.response.data }) );
  }

  render() {
    const { selected, name, date, url, photo, events, error, errors } = this.state;
    const { create, update, del } = errors;
    
    return (
      <Form className="mt-3">
        <FormGroup>
          <Label>Evento:</Label>
          <Input type="select" name="selected" value={ selected.id } onChange={ this.handleSelect } >
            { events.map( event => <option key={event.id} value={event.id}>{event.name}</option> ) }
          </Input>
          <FormText>Selecciona un evento para actualizarlo o eliminarlo.</FormText>
        </FormGroup>

        <FormGroup>
          <Label>Nombre: { selected.name }</Label>
          <Input type="text" value={ name } onChange={ this.handleName } placeholder="nombre" />
        </FormGroup>

        <FormGroup>
          <Label>Fecha: { selected.date ? selected.date.split('T')[0] : selected.date }</Label>
          <Input type="date" value={ date } onChange={ this.handleDate } placeholder="fecha" />
        </FormGroup>

        <FormGroup>
          <Label>Portada: { selected.cover.split('/').pop() }</Label>
          <Media className="m-1 justify-content-center">
            <img src={selected.cover} alt="" style={{height: 100, width: 80}}/>
          </Media>
          <Input type="file" value={ url } files={ [photo] } onChange={ this.handleCover }/>
        </FormGroup>
        
        { error.length > 0 && <Alert color="danger">{ error }</Alert> }

        <Button className="m-2" onClick={ this.createEvent } disabled={create}>Crear</Button>
        <Button className="m-2" onClick={ this.updateEvent } disabled={update}>Actualizar</Button>
        <Button className="m-2" onClick={ this.deleteEvent } disabled={del}>Eliminar</Button>
        <FormText>*Para crear un evento debes indicar nombre, fecha y portada.</FormText>
        <FormText>*Para actualizar un evento debes seleccionar un evento e indicar nombre, fecha y portada.</FormText>
        <FormText>*Para eliminar un evento debes seleccionarlo primero.</FormText>
      </Form>
    );
  }
}

export default AdminEvents;