import React from 'react';
import styled from 'styled-components';

const Gui = styled.div.attrs({
  className: "flex absolute top0 left0 absolute top0 z-1"
})``;
const Results = styled.div.attrs({
  className: "h50 bg-green w50 white ma2 pa3 z-1 "
})``;

const GuiWrapper = ({ city, handleSubmit }) => (
  <Gui>
      <Results>Where the @*!!! is {city}?</Results>
      <button onClick={handleSubmit}>Submit</button>
  </Gui>
)

export default GuiWrapper;