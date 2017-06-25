import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { setUser } from '../actions/userActions';
require('../../styles/Header.css');
import {baseURL} from '../../config/';
import ReactTooltip from 'react-tooltip';

class Header extends Component {
  constructor(){
    super();
  }

  logOut(e){
    e.preventDefault();
    console.log(e);

    this.props.logOut();
    window.location.replace(baseURL + 'api/auth/logout');
  }

  render(){
    return (
      <header>
        <h1> Emotions for Reddit </h1> 
        <nav>
          <ul>
            <h5>Front Page Analyses:</h5>
            <li><Link to="/chart/top">Top Posts</Link></li>
            <li><Link to="/chart/hot">Hot Posts</Link></li>
          </ul>
          <ul>
            <h5>Nav:</h5>
            <li><Link to="/home">Home</Link></li>
            {this.props.user.name !== undefined ? 
              <li><a onClick={(e) => this.logOut(e)} href="/api/auth/logout">Log Out </a></li> :
              <li><a href={`https://www.reddit.com/api/v1/authorize?client_id=1DGdeO4omeN3ug&response_type=code&state=authorization-pass&redirect_uri=${baseURL}api/auth/&duration=permanent&scope=identity,history,mysubreddits,read`}>Login</a></li>
            }
            {this.props.user.name !== undefined ? 
              <li>
                <a 
                  href={`https://www.reddit.com/u/${this.props.user.name}`}
                  data-tip 
                  data-for={"user-info"}
                   >
                    {this.props.user.name}
                </a>
              </li> : "" }
          </ul>
        </nav>
        <ReactTooltip type="info" id={"user-info"}>
          <span>Your Karma</span>
          <div>
            <span className="user-info">
            {'comment_karma' in this.props.user ? `Comment: ${this.props.user.comment_karma} ` : ""}
            </span>
            <span className="user-info">
            {'link_karma' in this.props.user ? `Link: ${this.props.user.link_karma}` : ""}</span>
          </div>
        </ReactTooltip>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const {name, comment_karma, link_karma} = state.user.user;
  return {
    user: {name, comment_karma, link_karma}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch({
        type: "CLEAR_USER",
        payload: ""
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));