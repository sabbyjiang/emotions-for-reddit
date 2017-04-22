import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

// Need to pass height, axisMargin, data
class YAxis extends Component {
  constructor(props){
    super();

    this.yScale = d3.scaleLinear();
    this.axis = d3.axisLeft(this.yScale)

    this.update_d3(props);
  }

  componentWillReceiveProps(newProps){
    this.update_d3(newProps);
  }

  update_d3(props){
    this.yScale
      .domain([d3.max(props.data.map(d => d.total)), 0])
      // This might be height minus margins. Check it!
      .range([0, props.height])
  }

  componentDidUpdate(){ this.renderAxis(); }
  componentDidMount(){ this.renderAxis(); }

  renderAxis(){
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis)
      .selectAll("text")
      .attr("font-family", "'Raleway', sans-serif");
  }

  render(){
    let transform = `translate(${this.props.margin.left - 40},0)`;
    return (
      <g className="axis" transform={transform}>
      </g>
    );
  }
}

export default YAxis;