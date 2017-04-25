import React, { Component } from 'react';
import * as d3 from 'd3';
// import data from '../../../build/data/2017-04-19-18-11';
import axios from 'axios';
import StackedBar from './StackedBar';
require('../../../styles/EmotionsGraph.css');
import Sorting from './Sorting';
import {baseURL} from '../../../config';

class EmotionsGraph extends Component {
  constructor(){
    super();
    this.state = {
      rawData: [],
      currentPost: "Hover over a bar to see the title",
      currentData: [],
      currentSort: "total"
    }
  }

  setCurrPost(title){
    this.setState({currentPost: title})
  }

  componentDidMount(){
    let queryURL = baseURL + "api";
    const subreddit = this.props.match.params.subredditName;
    if(subreddit){
      queryURL += `/auth/analysis?subreddit=${subreddit}`;
    } else {
      queryURL += `/gen/hot`;
    }

    axios.get(queryURL)
      .then(r => {
        this.setState({rawData: r.data, currentData: r.data[0]});
      })
      .catch(err => alert("err", err))
  }

  changeCurrentData(e){
    const newCurrentDataIndex = e.target.value;
    this.setState(prevState => {
      return {currentData: prevState.rawData[newCurrentDataIndex]}
    })
  }

  changeSort(e){
    const newSort = e.target.value;
    this.setState({currentSort: newSort});
  }

  render(){
    const margin = {top: 20, right: 40, bottom: 30, left: 40},
          width = 900 - margin.left - margin.right,
          height = 450 - margin.top - margin.bottom,
          colours = ['HSL(359, 80%, 70%)','HSL(118, 49%, 68%)','HSL(292, 35%, 64%)','HSL(45, 94%, 74%)','HSL(207, 54%, 60%)'];
    const params = {margin, width, height, colours};
    if(!this.state.rawData.length){
      return (
        <div className="center alert">
          <h2> Loading Data </h2>
        </div>
      )
    } else {
      return (
        <div className="App landing graph-page">
          <div className="graph-titles">
            <h2> Tone Analysis of {this.props.match.params.subredditName ? `r/${this.props.match.params.subredditName}'s` : "Reddit's"} Hot Page</h2>

            <p className="post-title"> Title: {this.state.currentPost} </p>
          </div>

          <div className="graph-options-container">
            <div className="graph-options">
              <h5> Analysis Type: </h5>
              <select onChange={this.changeCurrentData.bind(this)}>
                <option value="0">Emotion Tone</option>
                <option value="1">Language Tone</option>
                <option value="2">Social Tone</option>
              </select>
            </div>

            <div className="graph-options">
              <h5> Sort By: </h5>
              <Sorting currentData={this.state.currentData} changeSort={this.changeSort.bind(this)} currentSort={this.state.currentSort}/>
            </div>
          </div>
          <div className="graph">
            <svg width={width + 50} height={height + 150}>
              <StackedBar {...params} data={this.state.currentData} setCurrPost={this.setCurrPost.bind(this)} currentSort={this.state.currentSort}/>
            </svg>
          </div>
          
        </div>
      );
    }
  }
}

export default EmotionsGraph;