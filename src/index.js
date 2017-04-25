import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Router from './Router';
require('../styles/Index.css');

// this creates a capitalization function for the string
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.decapitalize = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

ReactDOM.render(
  Router,
  document.getElementById('root')
);