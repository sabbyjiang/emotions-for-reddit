import React from 'react';
// The below is just for reference. What was passed from the parent component
  // const x = (d) => this.xScale(d.data.title),
  //         y = (d) => this.yScale(d[1]),
  //         z = (data) => this.zScale(data.key),
  //         height = (d) => this.yScale(d[1]) - this.yScale(d[0]),
  //         width = this.xScale.bandwidth(),
  //         key = "stacked-bar-" + data.key;

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