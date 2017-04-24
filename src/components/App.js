import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //   }
  // }
  render(){
    return (
      <div className="App">
        <h1> Log In To Your Account </h1>
        <p> HELLO </p>
        <a href="https://www.reddit.com/api/v1/authorize?client_id=1DGdeO4omeN3ug&response_type=code&state=authorization-pass&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth&duration=permanent&scope=identity,history,mysubreddits,read">Login To Reddit</a>
        
      </div>
    );
  }
}

export default App;