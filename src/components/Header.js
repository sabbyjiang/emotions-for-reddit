import React from 'react';
import { Link } from 'react-router-dom';
require('../../styles/Header.css');
import {baseURL} from '../../config/';

const Header = () => {
  return (
    <header>
      <h1> Emotions for Reddit </h1> 
      <nav>
        <ul>
          <h5>Front Page Analyses:</h5>
          <li><Link to="/chart/top">Top Posts</Link></li>
          <li><Link to="/chart/hot">Hot Posts</Link></li>
          {/*<li><a href="/api/auth/logout">Log Out </a></li>*/}
        </ul>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><a href={`https://www.reddit.com/api/v1/authorize?client_id=1DGdeO4omeN3ug&response_type=code&state=authorization-pass&redirect_uri=${baseURL}api/auth/&duration=permanent&scope=identity,history,mysubreddits,read`}>Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;