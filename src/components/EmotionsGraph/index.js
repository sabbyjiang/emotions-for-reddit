import React, { Component } from 'react';
import * as d3 from 'd3';
import data from '../../../build/data/2017-04-19-18-11';
import StackedBar from './StackedBar';


class EmotionsGraph extends Component {
  constructor(){
    super();
    this.state = {
      rawData: data,
      currentPost: "",
    }
  }

  setCurrPost(title){
    this.setState({currentPost: title})
  }

  // componentWillMount(){
  //   this.setState({rawData: data});
  // }

  render(){
    const margin = {top: 20, right: 40, bottom: 30, left: 40},
          width = 980 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
    const params = {margin, width, height};
    
    return (
      <div>
        <svg width={width} height={height + 100}>
          <StackedBar {...params} data={this.state.rawData[0].emotionalTone} setCurrPost={this.setCurrPost.bind(this)}/>
        </svg>
        <p> Current Post: {this.state.currentPost} </p>
      </div>
    );
  }
}

export default EmotionsGraph;