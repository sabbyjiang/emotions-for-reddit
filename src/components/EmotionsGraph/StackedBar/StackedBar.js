import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import Column from './Column';
import XAxis from './XAxis';


// Let's test this with emotional range first;

class StackedBar extends Component {
  constructor(props){
    super();
    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();
    // This is taken from colour brewer
    this.zScale = d3.scaleOrdinal().range(['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9'])
    this.keys = [];
    this.update_d3(props);
  }

  componentWillReceiveProps(newProps){
    this.update_d3(newProps);
  }

  update_d3(props){
    let data = props.data;

    // Creates a total emotional score per post
    data.forEach(d => {
      d.total = 
        _.reduce(
          d.tones, 
          (sum, el) => sum + el.score,
          0
        )
    });

    data.sort((a, b) => b.total - a.total);

    data[0].tones.forEach(tone => {
      this.keys.push(tone.tone_id);
    });
    
    this.xScale
          .rangeRound([0, props.width])
          .paddingInner(0.05)
          .align(0.1)
          .domain(data.map((d) => d.title));
    
    this.yScale
          .rangeRound([props.height, 0])
          .domain([0, d3.max(data, d => d.total)])
          .nice();

    this.zScale
          .domain(this.keys);
  }

  makeColumn(data){
    const x = (d) => this.xScale(d.data.title),
          y = (d) => this.yScale(d[1]),
          z = (data) => this.zScale(data.key),
          height = (d) => this.yScale(d[0]) - this.yScale(d[1]),
          width = this.xScale.bandwidth(),
          key = "stacked-bar-" + data.key;
    
    return <Column  x={x.bind(this)}
                    y={y.bind(this)}
                    z={z.bind(this)}
                    height={height.bind(this)}
                    width={width}
                    key={key}
                    data={data}/>
  }

  makeXAxis(){
    const props = {
      height: this.props.height,
      x: this.xScale
    }

    return (
      <XAxis {...props} />
    )
  }

  make
  render(){
    let barStack = d3.stack().keys(this.keys)(this.props.data);
    return (
      <g className="stacked">
        { barStack.map(this.makeColumn.bind(this)) }
        {this.makeXAxis.bind(this)}
      </g>
    );
  }
}

export default StackedBar;