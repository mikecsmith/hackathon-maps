import React from "react";
import styled from "styled-components";

const GuiWrapper = ({ city, handleSubmit, answered, className }) => (
  <div
    className={`${className} flex flex-column absolute top0 left0 z-1 ma2 w50`}
  >
    <div className="flex ">
      <div className="bg-green white pa3 z-1">
        Where the @*!!! is {city}?
        <button
          className="link dim ph3 pv2 dib green bg-white bn mh2 f4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
    <ul className="w25 pa3">
      {answered.map(answer => (
        <li className="pl0 ml0 list green bb b--green mv2" key={answer.city}>
          {answer.city}: {answer.distance}
        </li>
      ))}
    </ul>
  </div>
);

export default GuiWrapper;