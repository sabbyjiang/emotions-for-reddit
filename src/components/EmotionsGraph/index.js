import React, { Component } from 'react';
import * as d3 from 'd3';
// import data from '../../../build/data/2017-04-19-18-11';
import axios from 'axios';
import StackedBar from './StackedBar';


class EmotionsGraph extends Component {
  constructor(){
    super();
    this.state = {
      rawData: [],
      currentPost: "",
    }
  }

  setCurrPost(title){
    this.setState({currentPost: title})
  }

  componentWillMount(){
    axios.get('/api/gen/hot')
      .then(r => {
        this.setState({rawData: r.data});
      })
      .catch(err => alert("err", err))
  }

  render(){
    const margin = {top: 20, right: 40, bottom: 30, left: 40},
          width = 980 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom,
          colours = ['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9'];
    const params = {margin, width, height, colours};
    if(!this.state.rawData.length){
      return (
        <div className="center alert">
          <h2> Loading Data </h2>
        </div>
      )
    } else {
      return (
        <div>
          <svg width={width + 50} height={height + 150}>
            <StackedBar {...params} data={this.state.rawData[0]} setCurrPost={this.setCurrPost.bind(this)}/>
          </svg>
          <p> Title: {this.state.currentPost} </p>
        </div>
      );
    }
  }
}

export default EmotionsGraph;