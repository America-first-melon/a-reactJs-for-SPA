import React, { Component } from 'react';

import Header from '../components/header';

/*背景 */
import Bg from '../images/bg.jpg';
const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

export default class Score extends Component{
    render(){
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="戳泡泡" />
            </div>
        )
    }
}