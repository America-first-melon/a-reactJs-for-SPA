import React, { Component } from 'react';

import Header from '../components/header';

/*背景 */
import Bg from '../images/bg2@2x.jpg';
const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

export default class Score extends Component{
    render(){
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="我的成绩" hasBg/>
            </div>
        )
    }
}