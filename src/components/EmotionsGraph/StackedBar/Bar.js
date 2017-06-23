import React from 'react';
import ReactTooltip from 'react-tooltip';

const Bar = (props) => {
  const handleClick = (url) => {
    window.open(url, '_blank');
  }

  // console.log(props.data);
  // Note to self: props.data.tones holds all the tones (JSON object with keys: score, tone_id, tone_name)
  
  return (
    <rect 
      data-tip data-for={"bar"}
      x={props.x}
      y={props.y}
      height={props.height}
      width={props.width}
      onMouseEnter={(e) => props.setCurrPost(props.data)}
      onClick={() => handleClick("http://www.reddit.com" + props.data.permalink) }>
    </rect>
  );
}

export default Bar;