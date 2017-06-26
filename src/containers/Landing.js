import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { setSubreddits, setPosts, addSelectedSR, removeSelectedSR, clearSelectedSR, setUser } from '../actions/userActions';
// import {baseURL} from '../../../config';
// require('../../styles/Landing.css');
require('../../styles/Landing.scss');

class Landing extends Component {
  constructor(){
    super();
  }

  componentDidMount(){
    if(this.props.subreddits.length !== 0){
      this.props.clearSelectedSR();
    } else {
      this.props.setUser();
      this.props.setSubreddits();
    }
  }

  createPostList(){
    return this.props.posts.map((post, index) => {
      return (
        <div className="post" key={post.permalink}>
          <h5><a href={`${post.url}`}>{post.title}</a></h5>
          <ul className="post-info">
            <li>Score: {post.score} </li>
            <li># Comments: <a href={`http://www.reddit.com${post.permalink}`}>{post.num_comments}</a> </li>
          </ul>
        </div>
      )
    })
  }

  createToneButton(){
    return (
      <Link to={`/chart/${this.props.posts[0].subreddit}`}>
        <h2> {`Get Tone Analysis For ${this.props.posts[0].subreddit_name_prefixed}`} </h2>
      </Link>
    )
  }

  checkBox(e){
    // e.target.checked checks the status of the event POST click so it's not that if the checkbox was unchecked before the event but rather what the state is post event
    if(this.props.selectedSubreddits.length < 5 && e.target.checked === true){
      this.props.addSR(e.target.value)
    } else if (e.target.checked === false) {
      this.props.removeSR(e.target.value);
    } else {
      alert("You can only select up to 5!");
      e.target.checked = false;
    }
  }
  
  createSubredditList(){
    return this.props.subreddits.map((sr, index) => {
      return (
        <label  key={sr.display_name + index} 
                onClick={() => this.props.setPosts(sr.display_name) }> 
          <input  type="checkbox" 
                  value={sr.display_name}
                  onChange={(e) => this.checkBox(e)}>
          </input>
          {sr.display_name_prefixed}
        </label>
      )
    });
  }

  goToRadar(e){
    e.preventDefault();
    this.props.history.push('/radar');
  }

  render(){
    if(!this.props.subreddits.length){
      return(
        <div className="center window">
          <div className="alert">
            <h2> Grabbing Your Data... </h2>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App landing">
          <div className="subreddits">
            <h2> Click on a Subreddit to See The Current Posts </h2>
          <form className="subreddit-form" onSubmit={(e) => this.goToRadar(e)}>
              <label className="absolute-top">
                <input type="submit" value="Get Tones For Subreddits" />
              </label>
              {this.createSubredditList()}
            </form>
          </div>
          <div className="posts-container">
            {this.props.posts.length ? this.createToneButton() : null}
            <div className="posts">
              {this.props.posts.length ? this.createPostList() : null }
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    subreddits: state.user.subreddits,
    posts: state.user.posts,
    selectedSubreddits: state.user.selectedSubreddits
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSubreddits: () => {
      dispatch(setSubreddits());
    }, 
    setPosts: (subreddit) => {
      dispatch(setPosts(subreddit));
    }, 
    addSR: (subreddit) => {
      dispatch(addSelectedSR(subreddit));
    },
    removeSR: (subreddit) => {
      dispatch(removeSelectedSR(subreddit));
    },
    clearSelectedSR: () => {
      dispatch(clearSelectedSR());
    },
    setUser: () => {
      dispatch(setUser());
    }
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Landing));