import React, { Component } from 'react';

class Bar extends Component {
  render(){
    return (
      <rect fill={this.props.color} width={this.props.width} height={this.props.height} x={this.props.x} y={this.props.y} />
    );
  }
}

export default Bar;