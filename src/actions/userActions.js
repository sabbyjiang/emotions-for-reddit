import { baseURL } from '../../config';
import Axios from 'axios';

export function setSubreddits(){
  return dispatch => {
    Axios.get(baseURL + 'api/auth/get-subscriptions')
        .then(response => {
          dispatch({
            type: "SET_USER_SUBREDDITS",
            payload: response.data
          })
        });
  };
};

export function setPosts(subreddit){
  return dispatch => {
    Axios.get(baseURL + 'api/auth/get-subreddit-posts?subreddit=' + subreddit)
      .then(response => {
        console.log(response);
        dispatch({
          type: "SET_POSTS",
          payload: response.data
        })
      });
  };
};

export function addSelectedSR(subreddit){
  return {
    type: "ADD_SELECTED_SR",
    payload: subreddit
  };
};

export function removeSelectedSR(subreddit){
  return {
    type: "REMOVE_SELECTED_SR",
    payload: subreddit
  };
};