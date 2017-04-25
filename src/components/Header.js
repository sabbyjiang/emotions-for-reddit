import React from 'react';
import { Link } from 'react-router-dom';
require('../../styles/Header.css');

const Header = () => {
  return (
    <header>
      <h1> Emotions for Reddit </h1> 
      <nav>
        <h5>Front Page Analysis</h5>
        <li><Link to="/chart/top">Top Posts</Link></li>
        <li><Link to="/chart/hot">Hot Posts</Link></li>
      </nav>
    </header>
  );
}

export default Header;