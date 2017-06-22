// To build react-redux-router
import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

// Route Components
import App from './containers/App';
import Landing from './containers/Landing';
import Radar from './containers/Radar';
import EmotionsGraph from './components/EmotionsGraph';
import Header from './containers/Header';

export default (
  <Provider store={ store } >
    <BrowserRouter> 
      <div className="body">
        <Header />
        <Route exact path="/" component={ App } />
        <Route path="/home" component={ Landing } />
        <Route path="/radar" component={ Radar } />
        <Route path="/chart/:subredditName" component={ EmotionsGraph } />
      </div>
    </BrowserRouter>
  </Provider>
)
