import React from "react";
import styled from "styled-components";

import PreViewEvent from "./PreViewEvent.js";

const Main = styled.div`
  height: 25vh;
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: center;
`;

class LastEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Main>
        <PreViewEvent />
        <PreViewEvent />
        <PreViewEvent />
      </Main>
    );
  }
}

export default LastEvents;
