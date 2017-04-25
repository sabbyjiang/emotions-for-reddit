import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import Column from './Column';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Legend from './Legend';

// Let's test this with emotional range first;

class StackedBar extends Component {
  constructor(props){
    super();
    
    this.state = {
      data: props.data,
    }

    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();
    this.zScale = null 
    this.keys = [];
    this.barStack = null;
    this.colours = null;
    this.update_d3(props);
  }

  componentWillReceiveProps(newProps){
    this.update_d3(newProps);
  }

  componentWillUpdate(newProps){
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

    data.sort((a, b) => b[props.currentSort] - a[props.currentSort]);

    // Must clear keys every time! 
    this.keys = [];
    data[0].tones.forEach(tone => {
      // Change this to tone name
      this.keys.push(tone.tone_name);
    });
    
    this.colours = props.colours;

    if(props.currentSort !== "total"){
      let indexToMove = this.keys.indexOf(props.currentSort);
      let toneToMove = this.keys.splice(indexToMove, 1);
      this.keys = toneToMove.concat(this.keys);

      let colourToMove = [props.colours.find((colour, index) => index === indexToMove)];

      let restOfColours = props.colours.filter((colour, index) => {
        return index !== indexToMove;
      });

      this.colours = colourToMove.concat(restOfColours);
    }
    
    this.xScale
          .rangeRound([0, props.width])
          .paddingInner(0.05)
          .align(0.1)
          .domain(data.map((d) => d.title));
    
    this.yScale
          .rangeRound([props.height, 0])
          .domain([0, d3.max(data, d => d.total)])
          .nice();

    this.zScale = d3.scaleOrdinal().range(this.colours)
          .domain(this.keys);

    // must clear barStack every time. Damn you React
    this.barStack = [];
    this.barStack = d3.stack().keys(this.keys)(props.data);
  }

  makeColumn(data, i){
    const x = (d) => this.xScale(d.data.title),
          y = (d) => this.yScale(d[1]),
          z = (data) => this.zScale(data.key),
          height = (d) => this.yScale(d[0]) - this.yScale(d[1]),
          width = this.xScale.bandwidth(),
          key = "stacked-bar-" + data.key + "-" + i;
    return <Column  x={x.bind(this)}
                    y={y.bind(this)}
                    z={z.bind(this)}
                    height={height.bind(this)}
                    width={width}
                    key={key}
                    data={data}
                    setCurrPost={this.props.setCurrPost}
                    />
  }

  makeXAxis(){
    const props = {
      height: this.props.height,
    }

    return (
      <XAxis {...props} width={this.props.width} data={this.props.data}/>
    )
  }

  makeYAxis(){
    return <YAxis {...this.props} />
  }

  makeLegend(){
    return <Legend keys={this.keys} {...this.props} newColours={this.colours}/>
  }
  
  render(){
    return (
      <g className="stacked" transform="translate(50,50)">
        { this.barStack.map(this.makeColumn.bind(this)) }
        {this.makeXAxis()}
        {this.makeYAxis()}
        {this.makeLegend()}
      </g>
    );
  }
}

export default StackedBar;