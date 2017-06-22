import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from '../components/User';
import { Main } from '../components/Main';
import { setName } from '../actions/userActions';

class Test extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <Main changeUsername={(newName) => this.props.setName(newName)}/>
        <User username={this.props.user.name}/>
      </div>
    );
  }
}

// What parts of the global state are we mapping to the local props
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

// What dispatch methods are we extracting to this component
const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    }, 
    setAge: (age) => {
      dispatch({
        type: "SET_AGE",
        payload: age
      })
    }
  };
};

// Connects react with redux
export default 
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Test)
    );
