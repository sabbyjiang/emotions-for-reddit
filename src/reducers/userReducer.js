import Axios from 'axios';
import { baseURL } from '../../config';

const userReducer = (state = {
    subreddits: [],
    posts: [],
    selectedSubreddits: [],
    name: "MAX"
}, action) => {
    switch (action.type) {
        case "SET_USER_SUBREDDITS": 
            state = {
                ...state, 
                subreddits: action.payload
            }
            break;
        case "SET_POSTS": 
            state = {
                ...state,
                posts: action.payload
            }
            break;
        case "ADD_SELECTED_SR":
            state = {
                ...state,
                selectedSubreddits: [...state.selectedSubreddits, action.payload]
            }
            break;
        case "REMOVE_SELECTED_SR":
            let indexToRemove = state.selectedSubreddits.indexOf(action.payload);
            let newSelection = [...state.selectedSubreddits];
            newSelection.splice(indexToRemove, 1);
            console.log("new array", newSelection);
            state = {
                ...state,
                selectedSubreddits: newSelection
            }
    }
    return state;
};

export default userReducer;