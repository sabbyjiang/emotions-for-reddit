import React, { Component } from 'react';
import * as d3 from 'd3';
import Radar from 'react-d3-radar';
import Axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { baseURL } from '../../../config';
import Legend from './Legend';
require('../../../styles/Radar.scss');

class RadarChart extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      currentData: []
    }
  }

  componentDidMount(){
    Axios.post(baseURL + 'api/auth/radar', {subreddits: this.props.selectedSubreddits})
      .then(r => {
        this.setState({data: r.data, currentData: r.data[0]});
      })
      .catch(err => console.log(err));
  }

  changeCurrentData(e){
    const newCurrentDataIndex = e.target.value;
    this.setState(prevState => {
      return {currentData: prevState.data[newCurrentDataIndex]}
    })
  }

  createLabels(){
    const srArray = this.state.currentData.data.sets.map(set => {
      return set.label
    });
    const params = {
      colours: d3.schemeCategory10,
      fillOpacity: "0.4",
      srArray: srArray
    }

    return (
      <Legend {...params} />
    )
  }
  

  render(){
    if(!this.state.data.length){
      return(
        <div className="center window">
          <div className="alert">
            <h2> Loading Your Data... </h2>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App landing radar">
          <div className="radar-graph">
            <div className="graph-options">
              <h3> Analysis Type: </h3>
              <select onChange={this.changeCurrentData.bind(this)}>
                <option value="0">Emotion Tone</option>
                <option value="1">Language Tone</option>
                <option value="2">Social Tone</option>
              </select>
            </div>
          </div>
          <Radar
            width={500}
            height={500}
            padding={70}
            domainMax={1}
            highlighted={null} 
            data = {this.state.currentData.data}
            />
          {this.createLabels()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSubreddits: state.user.selectedSubreddits
  };
};

export default withRouter(connect(mapStateToProps)(RadarChart));