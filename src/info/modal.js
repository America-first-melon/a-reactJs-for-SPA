import React, { Component } from 'react';

import './alert.css';

import {post} from '../config/fetch';

import Button from '../components/button';


/*背景 */
import btnBg from '../images/alert3.png';
import scoreBg from '../images/alert0.png';
import Xbtn from '../images/close.png';


const btnBgStyle = {
    backgroundImage: 'url('+btnBg+')'
}
const scoreBgStyle = {
    backgroundImage: 'url('+scoreBg+')'
}

export default class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId:new URLSearchParams(this.props.location.search).get('user_id'),
            personList:[],
            liveNumber:0,
        }
    }
    back = (e) => {
        let searchUrl = this.props.location.search;
        e.stopPropagation();
        this.props.history.replace({pathname:'/index',search:searchUrl,state: { modal: false }})
    }
    backAndStart = (e) => {
        let searchUrl = this.props.location.search;
        e.stopPropagation();
        this.props.history.replace({pathname:'/index',search:searchUrl,state: { modal: false ,isStart:true }})
    }
    checkGameNumber = () => {
        let searchUrl = this.props.location.search;
        post('/checkgamenumber',{user_id:this.state.userId}).then(
            (res)=>{
                if(res.live_number > 0){
                    this.props.history.replace({pathname:'/index',search:searchUrl,state: { modal: false ,isStart:true }})
                }else{
                    this.props.history.replace({pathname:'/modal',search:searchUrl,state: { 
                        modal: true ,
                        content:'今天的三次机会用完了',
                        desc:'分享可增加一次次数',
                        btn:{
                            text:'去分享',
                            padColor:{background:'linear-gradient(#fa94a9, #eb4863)'},
                            innerColor:{background:'#f65c82'},
                            clickFunc:2
                        }
                     }})
                }
            }
        )
    }
    renderBtn(){
        let btnObj = this.props.location.state.btn;
        if(btnObj.clickFunc === 1){
            return(
                <div onClick={this.backAndStart}>
                    <Button 
                        wrapColor={{width:'60%'}} 
                        padColor={btnObj.padColor} 
                        innerColor={btnObj.innerColor}  
                        name={btnObj.text}
                    />
                </div>
            )
        }else if(btnObj.clickFunc === 2){
            return(
                <div onClick={()=>{alert('非app环境无效')}}>
                    <Button 
                        wrapColor={{width:'80%'}} 
                        padColor={btnObj.padColor} 
                        innerColor={btnObj.innerColor}  
                        name={btnObj.text}
                    />
                </div>
            )
        }
    }

    componentWillMount() {
        if(this.props.location.state.isShowScore){
            post('/personhistory',{user_id:this.state.userId}).then(
                (res)=>{
                    this.setState({
                        personList:res.datas
                    })
                }
            )
        }
    }

    render(){
        let isShowScore = this.props.location.state.isShowScore;
        let btnObj = this.props.location.state.btn;

        if(isShowScore){
            return(
                <div className="common-pos html-wrap" style={{backgroundColor:'rgba(0,0,0,0.5)',zIndex:'100'}}>
                    <div className="common-pos alert-common alert-score" style={scoreBgStyle}>
                        <img src={Xbtn} className="alert-close" onClick={this.back} alt="alet"/>
                        <div className="alert-score-time">
                            <div>本次成绩</div><span>{this.props.location.state.useTime}秒</span>
                        </div>
                        <div className="ranks">
                            <div className="ranks-title">历史成绩</div>
                            <div className="ranks-list">
                                <ul>
                                    {
                                        this.state.personList.map((ele,index)=>{
                                            return(
                                                <li key={index}>
                                                    <span>{index+1}</span>
                                                    <span>{ele.use_milsecond/1000}秒</span>
                                                    <span>{ele.game_day_time}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="play-again-button" onClick={this.checkGameNumber}>
                            <Button 
                                wrapColor={{width:'80%'}} 
                                padColor={{background: 'linear-gradient(#fa94a9, #eb4863)'}}
                                innerColor={{background: '#f65c82'}}
                                name="再玩一次"
                            />
                        </div>
                    </div>
                    
                </div>
            )
        }else if(btnObj){
            return(
                <div className="common-pos html-wrap" style={{backgroundColor:'rgba(0,0,0,0.5)',zIndex:'100'}}>
                    <div className="common-pos alert-common" style={btnBgStyle}>
                        <img src={Xbtn} className="alert-close" onClick={this.back} alt="alet"/>
                        <div className="modal-content">{this.props.location.state.content}</div>
                        <p className="modal-desc">{this.props.location.state.desc}</p>
                        {this.renderBtn()}
                    </div>
                </div>
            )
        }
    }
}