import React, { Component } from 'react';

import Header from '../components/header';
import Button from '../components/button';
import RanksListComponent from '../components/refresh';

import {
  Link,
  NavLink,
  Route
} from 'react-router-dom';

import './score.css';

import {post} from '../config/fetch';

/*背景 */
import Bg from '../images/bg2@2x.jpg';
const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

export default class Score extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id:new URLSearchParams(this.props.location.search).get('user_id'),
            isOver:this.props.location.state.isOver,
            score:'暂无',
            rank:'暂未入榜' 
        }
    }
    componentWillMount(){
        console.log(this.props.location)
        post('/getscorelist',{user_id:this.state.user_id}).then(
            (Response) => {
                this.setState({
                    score:Response.data[0][0].use_milsecond/1000+'秒',
                    rank:Response.data[0][0].rowNum+'名'
                })
            }
        )
    }
    render(){
        let searchUrl = this.props.location.search;
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="我的成绩" hasBg/>
                <div className="neck">
                    <div className="neck-title">最好成绩</div>
                    <div className="neck-common"><span id="myBestScore">{this.state.score}</span></div>
                    <div className="neck-common">最佳排名:<span id="myRank">{this.state.rank}</span></div>

                    {
                        this.state.isOver ? 
                        <div className="neck-tab">
                            <Link to={{pathname:'/score/per',search:searchUrl}} className="neck-tab-common neck-tab-all neck-tab-actived" replace >历史成绩</Link>
                        </div>
                        :
                        <div className="neck-tab">
                            <NavLink to={{pathname:'/score/all',search:searchUrl}} className="neck-tab-common neck-tab-left" activeClassName="neck-tab-actived" replace >总排行榜</NavLink>
                            <NavLink to={{pathname:'/score/per',search:searchUrl}} className="neck-tab-common neck-tab-right" activeClassName="neck-tab-actived" replace >历史成绩</NavLink>
                        </div>
                    }
                    
                </div>
                <div className="content-list">
                    <Route path="/score/all" render={()=>(<RanksListComponent fetch="/getscorelist" special="1" />)}/>
                    <Route path="/score/per" render={()=>(<PersonalRanks  user_id={this.state.user_id} />)} />
                </div>
            </div>
        )
    }
}

class PersonalRanks extends Component{
    constructor(){
        super();
        this.state = {
            personList : []
        }
    }
    componentWillMount(){
        let user_id = this.props.user_id;    
        post('/personhistory',{user_id:user_id}).then(
            (Response)=>{
                this.setState({
                    personList : Response.datas
                })
            }
        )
    }
    render(){
        return(
            <ul id="dataList" >{
                this.state.personList.map((ele, index) => {
                    return (
                             <li key={index}>
                                 <span>{index}</span>
                                 <span>{ele.use_milsecond/1000}秒</span>
                                 <span>{ele.game_day}</span>
                             </li>
                        );
                    })
                }
            </ul>
        )
    }
}


