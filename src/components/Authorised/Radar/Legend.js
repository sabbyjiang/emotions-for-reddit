import React, { Component } from 'react';
import Key from './Key';

class Legend extends Component {
  makeKeys(sr, i){
    return (
      <Key  key={sr}
            width="100"
            colour={this.props.colours[this.props.srArray.length - i - 1]}
            index={i}
            sr={sr}
            fillOpacity={this.props.fillOpacity}
            />
    )
  }
  render(){
  console.log(this.props);
    return (
      <svg className="legend" width="100" height={"" + this.props.srArray.length * 22}>
        <g fontSize="10" textAnchor="end">
          {this.props.srArray.reverse().map(this.makeKeys.bind(this))}
        </g>
      </svg>
    );
  }
}

export default Legend;