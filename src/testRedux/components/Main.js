import React, { Component } from "react";

export class Main extends Component {
    constructor(){
        super();
        this.state = {
            name: ""
        }
    }

    updateName(e){
        this.setState({
            name: e.target.value
        });
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h1>The Main Page</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <input onChange={(e) => this.updateName(e) } value={this.state.name}/>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.props.changeUsername(this.state.name)}>Change the Username</button>
                    </div>
                </div>
            </div>
        );
    }
}