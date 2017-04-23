import React, { Component } from 'react';

class Sorting extends Component {
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({data: newProps.currentData});
    this.forceUpdate();
  }

  createOptions(currentData){
    let sortOptions = ["total"]
    currentData[0].tones.forEach(tone => sortOptions.push(tone.tone_name));
    return sortOptions.map(option => {
      if(option === this.props.currentSort){
        return <option key={option} 
                      value={option}
                      selected>
              {option.capitalize()}
              </option>
      } else {
        return  <option key={option} 
                        value={option}>
                {option.capitalize()}
                </option>
      }
    });
  }
  
  render(){
    if(!this.state.data.length){
      return(
        <select>
          <option>Loading...</option>
        </select>
      )
    } else {
      return(
        <select onChange={(e) => this.props.changeSort(e)}>
          {this.createOptions(this.state.data)}
        </select>
      )
    }
  }
}

export default Sorting;