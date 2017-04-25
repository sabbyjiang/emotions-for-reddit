import React, { Component } from 'react';
import _ from 'lodash';
import ControlRow from './ControlRow';


class Controls extends Component {
  constructor(){
    super();

    this.state = {
      yearFilter: () => true,
      year: '*',
      USstateFilter: () => true,
      USstate: '*'
    }
  }

  updateYearFilter(year, reset) {
    let filter = (d) => d.submit_date.getFullYear() == year;
    // Basically if reset is true or no year, then reset
    if( reset || !year ){
      filter = () => true;
      year = '*'
    }

    this.setState({yearFilter: filter, year: year})
  }

  updateUSstateFilter(USstate, reset){
    let filter = (d) => d.state == USstate;

    if(reset || !USstate){
      filter = () => true;
      USstate = "*";
    }

    this.setState({USstateFilter: filter, USstate: USstate});
  }

  componentDidUpdate(){
    this.props.updateDataFilter(
      ((filters) => {
        return (d) => filters.yearFilter(d)
                      && filters.USstateFilter(d);
      })(this.state)
    );
  }

  shouldComponentUpdate(nextProps, nextState){
    return !_.isEqual(this.state, nextState);
  }
  
  render(){
    let getYears = (data) => {
      return _.keys(_.groupBy(data, 
                            (d) => d.submit_date.getFullYear())).map(Number);
    }

    let getStates = (data) => {
      return _.keys(_.groupBy(data, 
                              (d) => d.state))
    }
    return (
      <div>
        <ControlRow data={this.props.data}
                    getToggleNames={getYears}
                    updateDataFilter={this.updateYearFilter.bind(this)} />
        <ControlRow data={this.props.data}
                    getToggleNames={getStates}
                    updateDataFilter={this.updateUSstateFilter.bind(this)}
                    capitalize="true"
                    />
      </div>
    );
  }
}

export default Controls;