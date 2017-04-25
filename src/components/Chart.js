import React, { Component } from 'react';

class Chart extends Component {
  render(){
    return (
      <svg width={this.props.width} height={this.props.height} />
    );
  }
}

export default Chart;