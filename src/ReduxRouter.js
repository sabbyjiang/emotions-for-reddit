// To build react-redux-router
import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

// Route Components
import App from './components/App';
import Authorised from './components/Authorised';
import EmotionsGraph from './components/EmotionsGraph';
import Header from './components/Header';
import RadarChart from './components/Authorised/Radar';
import Test from './testRedux';

export default (
  <Provider store={ store } >
    <BrowserRouter> 
      <div className="body">
        <Header />
        <Route exact path="/" component={App} />
        <Route path="/home" component={Authorised} />
        <Route path="/chart/:subredditName" component={EmotionsGraph} />
        <Route path="/test" component={ Test } />
      </div>
    </BrowserRouter>
  </Provider>
)
