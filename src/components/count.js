/**
 * create by Carmelon ANthony 2017-07
 */

import React, { Component } from 'react';


import './count.css';

export class CountComponent extends Component{
    render(){
        return(
            <div className="canvas-count-common">
                <img src={this.props.avatar == null ? 'http://m.maopp.cn/_static/img/maopao.png' : this.props.avatar } width="30px" height="30px" alt="avator" className="user-avator"/>
                <div id="clickNum">0</div>
            </div>
        )
    }
}