import React from 'react';

const Bar = (props) => {
  const handleClick = (url) => {
    window.open(url, '_blank');
  }
  return (
    <rect x={props.x}
          y={props.y}
          height={props.height}
          width={props.width}
          onMouseEnter={(e) => props.setCurrPost(props.title)}
          onClick={() => handleClick("http://www.reddit.com" + props.data.permalink) }>
    </rect>
  );
}

export default Bar;