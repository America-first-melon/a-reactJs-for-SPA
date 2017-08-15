import React, { Component } from 'react';

import Header from '../components/header';

import {post} from '../config/fetch';

import './canvas.css';

/*背景 图 音乐*/
import Bg from '../images/bg.jpg';
import Clock from '../images/clock.png';
import Music from '../static/audio-long.mp3';
import Tap from '../static/audio-tap.mp3';

const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

export default class Score extends Component{
    constructor(props){
        super(props);
        this.state = {
            userParams : this.props.location.state.userParams,
            liveNumber : 0
        }
    }
    gameStartFunc(){
        console.log('点击开始')
    }
    componentWillMount(){
        let param = new URLSearchParams(this.props.location.search).get('user_id');
        post('/checkgamenumber',{user_id:param}).then(
            (Response)=>{
                this.setState({
                    liveNumber:Response.live_number
                },function(){
                    this.props.history.replace({
                        pathname:'/modal',
                        search:this.props.location.search,
                        state: { 
                            modal: true,
                            content:`您有${this.state.liveNumber}次机会`,
                            btn:{
                                text:'开始游戏',
                                padColor:{background:'linear-gradient(#79e0cf,#49b675)'},
                                innerColor:{background:'#2eceb4'},
                                clickFunc:{function(){console.log(122)}}
                            } 
                        }
                    })
                })
            }
        )

    }
    render(){
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="戳泡泡" />
                <audio src={Music} loop id="long-bg"></audio>
                <audio src={Tap} id="tap-audio"></audio>
                <div className="canvas-count-wrap">
                    <div className="canvas-count-common">
                        <img src={this.state.userParams.avatar == null ? 'http://m.maopp.cn/_static/img/maopao.png' : this.state.userParams.avatar } width="30px" height="30px" alt="avator" className="user-avator"/>
                        <div id="clickNum">0</div>
                    </div>
                    <div className="canvas-count-common">
                        <img src={Clock} width="32px" height="32px" alt="avator" className="user-clock"/>
                        <div id="countTime">0.000</div>
                    </div>
                </div>
            </div>
        )
    }
}