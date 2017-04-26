import React, { Component } from 'react';
import Key from './Key';


class Legend extends Component {
  constructor(props){
    super();
    this.state = {
      keys: props.keys
    }
  }

  makeKeys(datum, i){
    
    // Colour has to be the reverse since the key maps are also reversed!
    return (
      <Key  datum={datum} 
            index={i} 
            key={datum + i} 
            colour={this.props.newColours[this.props.keys.length - i - 1]} 
            {...this.props}/>
    )
  }
  render(){
    return (
      <g  fontFamily="'Raleway', sans-serif" 
          fontSize="10" 
          textAnchor="end"
          >
        {this.props.keys.slice().reverse().map(this.makeKeys.bind(this))}
      </g>
    );
  }
}

export default Legend;