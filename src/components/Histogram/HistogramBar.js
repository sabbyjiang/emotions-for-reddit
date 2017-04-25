import React from 'react';

const HistogramBar = (props) => {
  let translate = `translate(${props.x}, ${props.y})`,
        label = props.percent.toFixed(0) + '%';


// The below fixes any width issue that we may have with labeling
  if (props.percent < 1) {
    label = props.percent.toFixed(2) + "%"
  }

  if (props.width < 20) {
    label = label.replace("%", "");
  }

  if (props.width < 10) {
    label = ""
  }
  return (
     <g transform={translate} className="bar">
        <rect width={props.width}
              height={props.height - 2}
              transform="translate(0,1)" >
        </rect>
        <text textAnchor="end"
              x={props.width - 5}
              y={props.height / 2 + 3} > 
          {label}
        </text>
      </g>
  );
}

export default HistogramBar;