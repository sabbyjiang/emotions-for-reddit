import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// ReactDOM.render(
//   <App />,
//   document.querySelector('#root')
// );

// Stuff below here is for d3
import H1BGraph from './components/H1BGraph';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

ReactDOM.render(
  <H1BGraph url="./data/h1bs.csv"/>, 
  document.querySelector('.h1bgraph')
)