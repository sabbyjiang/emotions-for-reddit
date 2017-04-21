import React, { Component } from 'react';
import Bar from './Bar';

class Column extends Component {
  // The below is just for reference. What was passed from the parent component
  // const x = (d) => this.xScale(d.data.title),
  //         y = (d) => this.yScale(d[1]),
  //         z = (data) => this.zScale(data.key),
  //         height = (d) => this.yScale(d[1]) - this.yScale(d[0]),
  //         width = this.xScale.bandwidth(),
  //         key = "stacked-bar-" + data.key;

  makeBars(d, index){
    let props = {
      x: this.props.x(d),
      y: this.props.y(d),
      height: this.props.height(d),
      width: this.props.width,
      key: d.data.title + index
    }

    return (
      <Bar {...props}  /> 
    )
  }
  render(){
    return (
      <g fill={this.props.z(this.props.data)}>
        {this.props.data.map(this.makeBars.bind(this))}
      </g>
    );
  }
}

export default Column;