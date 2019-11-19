import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    height: fit;
    width: 50%;
    min-width: 300px;
    max-width: 500px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    text-align: left;
`;

const Title = styled.h3`
    margin: 0px;
    margin-bottom: 5px;
    text-align: center;
`;

const Text = styled.input`
    width: 100%;
    text-align: left;
`;

const Message = styled.textarea`
    height: 100px;
    width: 100%;
    text-align: left;
`;

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contact_name:'',
            contact_email:'',
            contact_message:''
        }
    }

    handleSubmit = (event) => {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    handleName = (event) => {
        this.setState({contact_name: event.target.value});
    }

    handleEmail = (event) => {
        this.setState({contact_email: event.target.value});
    }

    handleMessage = (event) => {
        this.setState({contact_message: event.target.value});
    }

    render() {
        return (
            <Main>
                <form onSubmit={this.handleSubmit}>
                    <Title>Titulo</Title>

                    <label>Nombre:</label><br />
                    <Text type="text" value={this.state.contact_name} onChange={this.handleName} /><br /><br />

                    <label>Email:</label><br />
                    <Text type="email" value={this.state.contact_email} onChange={this.handleEmail} /><br /><br />

                    <label>Mensage:</label><br />
                    <Message value={this.state.contact_message} onChange={this.handleMessage} /><br /><br />
                    <input type="submit" value="Enviar" />
                </form>
            </Main>
        )
    }
}

export default Contact;