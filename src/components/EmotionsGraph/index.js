import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import StackedBar from './StackedBar';
// require('../../../styles/EmotionsGraph.css');
require('../../../styles/EmotionsGraph.scss');
import Sorting from './Sorting';
import { baseURL } from '../../../config';
import ReactTooltip from 'react-tooltip'

class EmotionsGraph extends Component {
  constructor(){
    super();
    this.state = {
      rawData: [],
      currentPost: {},
      currentData: [],
      currentSort: "total"
    }
  }

  setCurrPost(title){
    this.setState({currentPost: title})
  }

  getData(subreddit){
    let queryURL = baseURL + "api";

    if(subreddit !== "hot" && subreddit !== "top"){
      queryURL += `/auth/analysis?subreddit=${subreddit}`;
    } else {
      queryURL += `/gen/${subreddit}`;
    }

    axios.get(queryURL)
      .then(r => {
        this.setState({rawData: r.data, currentData: r.data[0]});
      })
      .catch(err => console.log("err", err));
  }

  componentDidMount(){
    let queryURL = baseURL + "api";
    const subreddit = this.props.match.params.subredditName;
    this.getData(subreddit);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.match.params.subredditName !== prevProps.match.params.subredditName){
      const newSubreddit = this.props.match.params.subredditName;
      this.getData(newSubreddit);
    }
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

  getTonesForTooltip(tone){
    return (
      <li key={tone.tone_id}>
        <span className="emph">{`${tone.tone_name}`}</span>{`: ${(tone.score*100).toFixed(2)}%`}
      </li>
    )
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
          <div className="graph-details-container">
            <div className="graph-titles">
              <h2> Tone Analysis of {this.props.match.params.subredditName ? `r/${this.props.match.params.subredditName}'s` : "Reddit's"}</h2>

              <p> Hover over the graph for more info </p>
              <p> Click on a bar to open the specific thread </p>
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
          </div>
          
          <div className="graph">
            <svg width={width + 50} height={height + 150}>
              <StackedBar {...params} data={this.state.currentData} setCurrPost={this.setCurrPost.bind(this)} currentSort={this.state.currentSort}/>
            </svg>
          </div>
          
          <ReactTooltip type="info" id={"bar"}>
            <span className="sr-title">{this.state.currentPost.title}</span>
            <br /><br />
            <ul className="tone-stats">
              {this.state.currentPost.tones ? this.state.currentPost.tones.map((tone) => this.getTonesForTooltip(tone)) : ""}
            </ul>
          </ReactTooltip>
        </div>
      );
    }
  }
}

export default EmotionsGraph;