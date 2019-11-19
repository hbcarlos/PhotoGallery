import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  height: 25vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PreViewPhoto = styled.div`
  background-image: url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
`;

/* const Photo = styled.div`
  height: 25vh;
  width: 100%;
`; */

class GalleryEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        photos: ['https://picsum.photos/600/600','https://picsum.photos/601/601','https://picsum.photos/602/602','https://picsum.photos/603/603','https://picsum.photos/604/604','https://picsum.photos/605/605','https://picsum.photos/606/606']
    }
  }

  listPhotos() {
    const listItems = this.state.photos.map((photo) =>
      <Row>
        <PreViewPhoto imageUrl={photo} />
        <PreViewPhoto imageUrl={photo} />
        <PreViewPhoto imageUrl={photo} />
        <PreViewPhoto imageUrl={photo} />
      </Row>
    );
    return listItems;
  }

  render() {
    return (
      <Main>
          {this.listPhotos()}
      </Main>
    )
  }
}

export default GalleryEvent;