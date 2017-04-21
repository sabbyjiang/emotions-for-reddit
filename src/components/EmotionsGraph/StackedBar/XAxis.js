import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

const XAxis = (props) => {
  const transform = `translate(0,${props.height})`;
  return (
    <g  transform={transform}
        className="x-axis">
    </g>
  );
}

export default XAxis;