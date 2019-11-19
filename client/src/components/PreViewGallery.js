import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.div`
    height: 100%;
    width: 25%;
`;

const Image = styled.div`
    background-image: url(${({ imageUrl }) => imageUrl});
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    justify-content: bottom;
    align-items: bottom;
`;

const Title = styled.div`
    height: fit;
    width: fit;
    padding: 2%;
    color: black;
    text-align: left;
    
    /* shadow */
    background-color: rgba(0, 0, 0, 0.7);
    -webkit-box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.7);
    box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.7);
`;

const Name = styled.label`
    height: 80%;
    width: 100%;
    color: white;
    font-size: 14px;
    font-weight: bold;
`;

class PreViewGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'Ejemplo jdsan lkjsfnl',
            imageUrl:'https://picsum.photos/600/600'
        }
    }

    render() {
        return (
            <Main>
                <Link to='/Events' style={{ textDecoration: 'none' }}>
                    <Image imageUrl={this.state.imageUrl} >
                        <Title><Name>{this.state.title}</Name></Title>
                    </Image>
                </Link>
            </Main>
        )
    }
}

export default PreViewGallery;