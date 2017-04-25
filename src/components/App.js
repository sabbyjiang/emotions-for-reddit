import React, { Component } from 'react';
import Axios from 'axios';
require('../../styles/App.css');

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //   }
  // }
  render(){
    return (
      <div className="App">
        <div className="welcome"> 
          <h3> Explore the emotions of the front page of Reddit </h3>
          <p> Or log in to see data from your own subreddits </p>
          <p> More features coming soon </p>
          <p className="text-c">
            <a href="https://www.reddit.com/api/v1/authorize?client_id=1DGdeO4omeN3ug&response_type=code&state=authorization-pass&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth&duration=permanent&scope=identity,history,mysubreddits,read">Login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;