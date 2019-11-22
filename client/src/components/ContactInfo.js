import React from "react";
import styled from "styled-components";

const Main = styled.div`
  height: fit;
  width: 50%;
  min-width: 300px;
  max-width: 500px;
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const Image = styled.div`
  height: 200px;
  width: 150px;
`;

const Info = styled.div`
  height: fit;
  width: 75%;
  min-width: 140px;
  max-width: 340px;
  padding: 5px;
  text-align: left;
`;

const Name = styled.h2`
  margin: 0px;
  margin-bottom: 5px;
`;

const Text = styled.label``;

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Carlos Herrero",
      descripcion: "example@gmail.com",
      imageUrl: "https://picsum.photos/150/200"
    };
  }

  render() {
    return (
      <Main>
        <Image>
          <img src={this.state.imageUrl} alt=""></img>
        </Image>
        <Info>
          <Name>{this.state.name}</Name>
          <Text>{this.state.descripcion}</Text>
        </Info>
      </Main>
    );
  }
}

export default ContactInfo;
