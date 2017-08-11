import React, { Component } from 'react';

import Header from '../components/header';

/*背景 */
import Bg from '../images/info.png';
const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

export default class Score extends Component{
    render(){
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="中奖啦" hasBg/>
            </div>
        )
    }
}