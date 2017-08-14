import React, { Component } from 'react';

import Header from '../components/header';
import Loading from '../components/loading';
import RanksListComponent from '../components/refresh';
import {post} from '../config/fetch';

import './list.css';

/*背景+图片 */
import Bg from '../images/info.png';
import Light from '../images/light.png';
import Winn from '../images/make.png';


const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}
const listBgStyle = {
    backgroundImage: 'url('+Light+')'
}

export default class Score extends Component{
    render(){
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="中奖啦" hasBg/>
                <div>
                    <div className="content-title" style={listBgStyle}>
                        <img src={Winn} alt="winner" width="100%" />
                    </div>
                    <div className="content-list">
                        <RanksListComponent fetch="/queryRanking" />
                    </div>
                </div>
            </div>
        )
    }
}

