import React, { Component } from 'react';

import './loading.css';

import LoadingGif from '../images/loading.gif';

export default class Loading extends Component{
    render(){
        return (
            <div className="common-pos loading-wrap">
                <div className="common-pos loading-img">
                    <img src={LoadingGif} />
                </div>
            </div>
        )
    }
}