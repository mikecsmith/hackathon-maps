import React from "react";
import styled from "styled-components";

const GuiWrapper = ({ city, handleSubmit, answered, className, disabled, finished, resetState }) => (
  <div
    className={`${className} flex flex-column absolute top0 left0 z-1 ma2 w50`}
  >
    <div className="flex ">
      <div className="bg-green white pa3 z-1">
        {finished ? "FINISHED!!!!!!!!!!!!!!!!!" : `Where the @*!!! is ${city}?` }
        { finished ? 
          <button className="link dim ph3 pv2 dib green bg-white bn mh2 f4" onClick={resetState}>Reset</button> 
          :
          <button
            className="link dim ph3 pv2 dib green bg-white bn mh2 f4"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Submit
          </button>
        }
      </div>
    </div>
    <ul className="w25 pa3">
      {answered.map(answer => (
        <li className="pl0 ml0 list green bb b--green mv2" key={answer.city}>
          {answer.city}: {answer.distance}km from target. {answer.correct ? 'YAY :)' : 'You suck!'}
        </li>
      ))}
    </ul>
    { finished ? <div className="bg-green white pa3 z-1">You scored: {answered.map( answer => answer.correct ).reduce( (accumulator, correct) => correct ? accumulator + 1 : accumulator, 0 )}!!!</div> : null }
  </div>
);

export default GuiWrapper;
