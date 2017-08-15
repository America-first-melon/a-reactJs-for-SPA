import React, { Component } from 'react';
import './header.css';

import {
    Route,
} from 'react-router-dom';

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    renderLeft(){
        return(
            <Route render={
                ({history})=>(
                    <div className="header-icon" onClick={(e)=>{console.log(history); e.stopPropagation();history.goBack()}}></div>
                )}
            />
        )
    }
    render(){
        return (

            <div className="header-wrap" style={this.props.hasBg ? {background:'#151b29'} : {background: 'rgba(0,0,0,.1)'}}>
                {this.renderLeft()}
                <h1 className="header-title">{this.props.title}</h1>
            </div>
        )
    }
}