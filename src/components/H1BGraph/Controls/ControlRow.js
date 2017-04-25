import React, { Component } from 'react';
import _ from 'lodash';
import Toggle from './Toggle';


class ControlRow extends Component {
  // These values are being passed in from Toggle.js (passed in the name of the Toggle Button and it's current toggle state);
  makePick(picked, newState){
    let toggleValues = this.state.toggleValues;

    toggleValues = _.mapValues(toggleValues,
                              (value, key) => newState && key == picked);
    // update data filter is higher up and sends up the picked state
    this.props.updateDataFilter(picked, !newState);

    // Sets the toggle values again with the new ones! 
    this.setState({toggleValues: toggleValues});

  }

  componentWillMount(){
    let toggles = this.props.getToggleNames(this.props.data),
        toggleValues = _.zipObject(toggles,toggles.map(() => false));

    this.state = {toggleValues: toggleValues};
  }

  _addToggle(name){
    let key = `toggle-${name}`,
        label = name;
    if(this.props.capitalize){
      label = label.toUpperCase();
    }
    // The toggle button on click calls the make pick function defined above!

    return (
      <Toggle key={key}
              label={label}
              name={name}
              value={this.state.toggleValues[name]}
              onClick={this.makePick.bind(this)} />
    )
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-12">
          {this.props
            .getToggleNames(this.props.data)
            .map((name) => this._addToggle(name))}
            {/*This maps through the data pass through (which groups the data, defined above) and then creats a toggle button based on that name (year in this case)*/}
        </div>
      </div>
    );
  }
}

export default ControlRow;