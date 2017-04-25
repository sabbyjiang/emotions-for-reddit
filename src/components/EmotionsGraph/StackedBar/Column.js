import React, { Component } from 'react';
import Bar from './Bar';

class Column extends Component {
  // Having a weird issue where because of a same title of post (x-post) the second bar won't render
  makeBars(d, index){
    let props = {
      x: this.props.x(d),
      y: this.props.y(d),
      height: this.props.height(d),
      width: this.props.width,
      key: d.data.title + "-" + d.data.subreddit + "-" + index,
      data: d.data,
      title: d.data.title,
      setCurrPost: this.props.setCurrPost
    }

    return (
      <Bar {...props}  /> 
    )
  }
  render(){
    return (
      <g  fill={this.props.z(this.props.data)} >
        {this.props.data.map(this.makeBars.bind(this))}
      </g>
    );
  }
}

export default Column;