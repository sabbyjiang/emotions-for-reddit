import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {baseURL} from '../../../config';

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
          <h3><a href={`${post.url}`}>{post.title}</a></h3>
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
        <div>
          <p> {`Get Tone Analysis For ${this.state.posts[0].subreddit_name_prefixed}`} </p>
        </div>
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
        <div className="alert center">
          <h1> Grabbing Your Subreddits </h1>
        </div>
      )
    } else {
      return (
        <div>
          <div className="subreddits">
            <h1> Click on a Subreddit to See The Current Posts </h1>
            <form onSubmit={(e) => this.props.submitSR(e)}>
              {this.createSubredditList()}
              <input type="submit" value="Get Tones For Subreddits" />
            </form>
          </div>
          <div>
            {this.state.posts.length ? this.createToneButton() : null}
            {this.state.posts.length ? this.createPostList() : null }
          </div>
        </div>
      );
    }
  }
}

export default Landing;