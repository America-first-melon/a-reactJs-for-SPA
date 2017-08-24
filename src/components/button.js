import React, { Component } from 'react';

import './button.css';

export default class Button extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div style={this.props.wrapColor} className="btn-mar">
                <div style={this.props.padColor} className="btn-pad">
                    <div style={this.props.innerColor} className="btn-inner">{this.props.name}</div>
                </div>
            </div>
        )
    }
}