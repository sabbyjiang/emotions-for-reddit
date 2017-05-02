import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {baseURL} from '../../../config';
require('../../../styles/Landing.css');

class Landing extends Component {
  constructor(){
    super();
    this.state = {
      subreddits: [],
      posts: [],
      selectedSubreddits: [],
    }
  }

  componentDidMount(){
    Axios.get(baseURL + 'api/auth/get-subscriptions')
      .then(response => {
        console.log(response);
        const data = response.data;
        this.setState({subreddits: data});
      })
  }

  getSubredditPosts(subreddit){
    Axios.get(baseURL + 'api/auth/get-subreddit-posts?subreddit=' + subreddit)
      .then(r => {
        this.setState({posts: r.data})
      })
  }

  createPostList(){
    return this.state.posts.map((post, index) => {
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
      <Link to={`/chart/${this.state.posts[0].subreddit}`}>
        <h2> {`Get Tone Analysis For ${this.state.posts[0].subreddit_name_prefixed}`} </h2>
      </Link>
    )
  }

  checkBox(e){
    if(this.props.selected.length < 5 || e.target.checked === false){
      this.props.selectSR(e.target.value)
    } else {
      alert("You can only select up to 5!");
      e.target.checked = false;
    }
  }
  
  createSubredditList(){
    return this.state.subreddits.map((sr, index) => {
      return (
        <label  key={sr.display_name + index} 
                onClick={() => this.getSubredditPosts(sr.display_name) }> 
          <input  type="checkbox" 
                  value={sr.display_name}
                  onChange={(e) => this.checkBox(e)}>
          </input>
          {sr.display_name_prefixed}
        </label>
      )
    });
  }

  render(){
    if(!this.state.subreddits.length){
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
            <form className="subreddit-form" onSubmit={(e) => this.props.submitSR(e)}>
              <label className="absolute-top">
                <input type="submit" value="Get Tones For Subreddits" />
              </label>
              {this.createSubredditList()}
            </form>
          </div>
          <div className="posts-container">
            {this.state.posts.length ? this.createToneButton() : null}
            <div className="posts">
              {this.state.posts.length ? this.createPostList() : null }
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Landing;