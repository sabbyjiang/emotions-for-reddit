import React, { Component } from 'react';
import HistogramBar from './HistogramBar';
// How to import all from d3. Updated from the book
import * as d3 from 'd3';
import _ from "lodash";
// Do this after creating the graph!
import Axis from './Axis';


class Histogram extends Component {
  constructor(props){
    super();
    this.histogram = d3.histogram();
    this.widthScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.update_d3(props);
  }

  componentWillReceiveProps(newProps){
    this.update_d3(newProps);
  }

  update_d3(props){
    this.histogram
    // bins is thresholds in v4
      .thresholds(props.bins)
      .value(props.value);

    let bars = this.histogram(_.concat(props.data));
    let counts = bars.map((d) => d.length);
    
    this.widthScale
      .domain([d3.min(counts), d3.max(counts)])
      .range([9, props.width - props.axisMargin]);

    this.yScale
    // Change this from x + dx to x0 and x1
      .domain([0, d3.max(bars.map( d => d.x0 + d.x1))])
      .range([0, props.height - props.topMargin - props.bottomMargin]);
  }

  makeBar(bar){
    let percent = bar.length / this.props.data.length*100;

    let props = {
      percent: percent,
      x: this.props.axisMargin,
      y: this.yScale(bar.x0),
      width: this.widthScale(bar.length),
      height: this.yScale((bar.x1 - bar.x0)),
      key: "histogram-bar-" + bar.x0 + "-" + bar.length
    }

    // return null;

    return (
      <HistogramBar {...props} />
    )
  }
  render(){
    let translate = `translate(0, ${this.props.topMargin})`,
        bars = this.histogram(this.props.data);
    return (
      <g className="histogram" transform={translate}>
        <Axis bars={bars} {...this.props}/>
        <g className="bars">
          {/* the book uses a :: syntax which I *think* translates to bind(this)*/}
          {/* That is a syntactic sugar from es7... which we're not using. Lols.*/}
          {bars.map(this.makeBar.bind(this))}
        </g>
      </g>
    );
  }
}

export default Histogram;