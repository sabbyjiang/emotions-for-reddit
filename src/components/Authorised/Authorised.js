import React, { Component } from 'react';
import Landing from './Landing';
import Radar from './Radar';

class Authorised extends Component {
  constructor(){
    super();
    this.state = {
      show: "Landing",
      selectedSubreddits: []
    }
  }

  setSelectedSubreddits(subreddit){
    const index = this.state.selectedSubreddits.indexOf(subreddit);
    this.setState(prevState => {
      if(index === -1){
        let newSelect = prevState.selectedSubreddits.concat([subreddit]);
        return {selectedSubreddits: newSelect}
      } else {
        let prevSelected = prevState.selectedSubreddits;
        prevSelected.splice(index, 1);
        return {selectedSubreddits: prevSelected}
      }
    });
  }

  submitSR(e){
    e.preventDefault();
    
    this.setState(prevState => {
      return {show: prevState.show === "Landing" ? "Radar" : "Landing"}
    });
  }

  whichComponent(){
    switch(this.state.show){
      case "Landing":
        return (
          <Landing  selectSR={this.setSelectedSubreddits.bind(this)} 
                    selected={this.state.selectedSubreddits}
                    submitSR={this.submitSR.bind(this)}
                    {...this.props}/>
        );
        break;
      case "Radar":
        return < Radar subreddits={this.state.selectedSubreddits} {...this.props}/>;
        break;
    }
  }

  render(){
    return (
      this.whichComponent()
    );
  }
}

export default Authorised;