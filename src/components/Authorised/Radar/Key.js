import React from 'react';

const Keys = (props) => {
  return (
    <g transform={"translate(0," + props.index * 20 + ")"} >
      <rect x={props.width - 19}
            width="19"
            height="19"
            fill={props.colour}
            fillOpacity={props.fillOpacity} >
      </rect>
      <text x={props.width - 24}
            y="9.5"
            dy="0.32em">
            {props.sr}
      </text>
    </g>
  );
}

export default Keys;