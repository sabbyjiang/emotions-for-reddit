import React, { Component } from 'react';
import * as d3 from 'd3';
import data from '../../../build/data/2017-04-19-18-11';
import StackedBar from './StackedBar';


class EmotionsGraph extends Component {
  constructor(){
    super();
    this.state = {
      rawData: []
    }
  }

  componentWillMount(){
    this.setState({rawData: data});
  }

  // loadRawData(){
  //   d3.json(this.props.url)
  //     .get(d => {
  //       // alert(`Total: ${d.length}, Emotional: ${d[0].emotionalTone}, Language: ${d[1].languageTone}, SocialTone: ${d[2].socialTone}`);
  //       this.setState({rawData: d})
  //     })
  // }

  render(){
    const margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
    const params = {margin, width, height};
    // console.log(this.state.rawData);
    return (
      <div>
        <svg width={width} height={height}>
          <StackedBar {...params} data={this.state.rawData[0].emotionalTone} />
        </svg>
      </div>
    );
  }
}

export default EmotionsGraph;