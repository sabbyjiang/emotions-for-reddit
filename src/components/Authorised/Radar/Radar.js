import React, { Component } from 'react';
import * as d3 from 'd3';
import Radar from 'react-d3-radar';
import Axios from 'axios';
import {baseURL} from '../../../../config';
import Legend from './Legend';
const data = require('../../../../db/sub-testing/2017-04-24-14-40-cleaned');

class RadarChart extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount(){
    const srString = this.props.subreddits.join(',');
    Axios.get(baseURL + 'api/auth/radar', {
      params: {
        subreddits: srString}
      })
      .then(r => {
        this.setState({data: r.data});
      })
      .catch(err => console.log(err));
  }

  createLabels(){
    const srArray = this.state.data[0].data.sets.map(set => {
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
    console.log(this.props);
    if(!this.state.data.length){
      return(
        <h1> Loading Data </h1>
      )
    } else {
      console.log(this.state.data);
      return (
        <div className="radar">
          <Radar
            width={500}
            height={500}
            padding={70}
            domainMax={1}
            highlighted={null} 
            data = {this.state.data[0].data}
            />
          {this.createLabels()}
        </div>
      );
    }
  }
}

export default RadarChart;