import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Axis extends Component {
  constructor(props){
    super();

    this.yScale = d3.scaleLinear();
    this.axis = d3.axisLeft(this.yScale)
                  .tickFormat(d => "$" + this.yScale.tickFormat()(d));

    this.update_d3(props);
  }

  componentWillReceiveProps(newProps){
    this.update_d3(newProps);
  }

  update_d3(props){
    this.yScale
        .domain([0, d3.max(props.bars.map(d => d.x1))])
        .range([0, props.height-props.topMargin - props.bottomMargin]);

    this.axis
        .ticks(props.bars.length)
        .tickValues(props.bars
                          .map(d => d.x0)
                          .concat(props.bars[props.bars.length - 1].x1));
  }

  componentDidUpdate(){ this.renderAxis(); }
  componentDidMount(){ this.renderAxis(); }

  renderAxis(){
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);
  }

  render(){
    console.log(this.props);
    let transform = `translate(${this.props.axisMargin - 3}, 0)`;
    return (
      <g className="axis" transform={transform}>
      </g>
    );
  }
}

export default Axis;