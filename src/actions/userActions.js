import { baseURL } from '../../config';
import Axios from 'axios';
import { nest, ascending } from 'd3';

const sortBy = (elA, elB, property) => {
  let a = elA[property].decapitalize(),
      b = elB[property].decapitalize();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

export function setSubreddits(){
  return dispatch => {
    Axios.get(baseURL + 'api/auth/get-subscriptions')
        .then(response => {
          dispatch({
            type: "SET_USER_SUBREDDITS",
            payload: response.data.sort((a, b) => sortBy(a, b, "display_name"))
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