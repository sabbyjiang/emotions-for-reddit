import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class XAxis extends Component {
  constructor(props){
    super();

    this.xScale = d3.scaleBand();
    this.axis = d3.axisBottom(this.xScale);

    this.update_d3(props);
  }

  componentWillReceiveProps(newProps){
    this.update_d3(newProps);
  }

  update_d3(props){
    this.xScale
      .rangeRound([0, props.width])
      .domain(props.data.map(d => d.subreddit));
  }

  componentDidUpdate(){ this.renderAxis(); }
  componentDidMount(){ this.renderAxis(); }

  renderAxis(){
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
  }
  
  render(){
    const transform = `translate(0,${this.props.height})`;
    return (
      <g  transform={transform}
          className="x-axis">
      </g>   
    );
  }
}

export default XAxis;