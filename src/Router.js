import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import Authorised from './components/Authorised';
import EmotionsGraph from './components/EmotionsGraph';
import RadarChart from './components/Authorised/Radar';
import Header from './components/Header';

export default (
   <BrowserRouter> 
        <div className="body">
            <Header />
            <Route exact path="/" component={App} />
            <Route path="/home" component={Authorised} />
            <Route path="/chart/:subredditName" component={EmotionsGraph} />
            <Route path="/testing" component={RadarChart} />
        </div>
    </BrowserRouter>
)
