import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import Authorised from './components/Authorised';
import EmotionsGraph from './components/EmotionsGraph';
import RadarChart from './components/Authorised/Radar';

export default (
   <BrowserRouter> 
        <div className="App">
            <Route exact path="/" component={App} />
            {/* exact makes it so that going to projects doesn't also load home2*/}
            <Route path="/home" component={Authorised} />
            <Route path="/chart/:subredditName" component={EmotionsGraph} />
            <Route path="/testing" component={RadarChart} />
        </div>
    </BrowserRouter>
)
