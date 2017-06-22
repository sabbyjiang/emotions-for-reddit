const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    // Action is an object with a type
    // Determine what to do based on the type of action (why we're using a switch statement)
    switch (action.type) {
        case "ADD": 
            // the below is bad because it is not changing in an immutable way! 
            // state.result += action.payload;

            // Create a new space in memory for the new state to preserve old states
            state = {
                ...state,
                result: state.result + action.payload,
                // this does not store the last results but rather stores the last payloads! 
                lastValues: [...state.lastValues, action.payload]
            }
            break;
        case "SUBTRACT": 
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            }
            break;
    }
    // Must return the new state that the application will use
    return state;
};

export default mathReducer;