/**
 * created Carmelo Anthony
 */
import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

import {post} from '../config/fetch';

import Header from '../components/header';
import Button from '../components/button';
import Loading from '../components/loading';

import './info.css';

/*图标*/
import line1 from '../images/line1.png';
import line2 from '../images/line2.png';
import line3 from '../images/line3.png';
import no1 from '../images/no1.png';
import no2 from '../images/no2.png';
import no3 from '../images/no3.png';
/*背景 */
import Bg from '../images/info2.jpg';
const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}
class Info extends Component {
    constructor(props){
        super(props);
        this.state={
            isMount : false,
            isOver :false,
            endTime : ''
        }
    }
    componentWillMount(){
        post('/getgameconfig',{user_id:new URLSearchParams(this.props.location.search).get('user_id')}).then(
            (Response)=>{
                this.setState({
                    endTime:Response.game_end_time
                });
                let endTimeStramp = new Date(Response.game_end_time).getTime(),
                    nowTimeStramp = new Date().getTime();
                nowTimeStramp > endTimeStramp && this.setState({isOver:true});
                // nowTimeStramp > endTimeStramp && this.setState({isOver:false}); //显示alert出中奖时间，用于游戏未结束
                console.log(this.state.isOver)
            }
        ).then(this.setState({
            isMount : true,
        }))
    }
    renderMainContent(){
        let searchUrl = this.props.location.search;
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="游戏介绍"/>
                <div className="content-wrap">
                    <div className="content">
                        <div className="card">
                            <ul>
                                <li><img src={line1} alt=""/>活动时间：8月03日20:00-8月13日24:00</li>
                                <li><img src={line2} alt=""/>戳完气泡耗时最短的<span className="special-color">前100名</span>都有惊喜大奖</li>
                                <li><img src={line3} alt=""/>每人每日3次游戏机会哦</li>
                                <div className="content-tip">分享至微信、朋友圈等平台可<span className="special-color">各+1</span>次机会</div>
                            </ul>
                            <div className="content-copyright">活动解释权归冒泡官方所有</div>
                        </div>
                        <div className="card card-add">
                            <div className="card-title">奖品详情</div>
                            <ul>
                                <li className="special-li">
                                    <img src={no1} alt=""/>
                                    <div className="special-li-div">
                                        <div>&nbsp;重庆豪华双人4日游+希尔顿酒店住宿3晚<br/></div>
                                        <div>(含两人往返机票)&nbsp;可折合现金<span className="special-color">8888</span>元</div>
                                    </div>
                                </li>
                                <li><img src={no2} alt=""/>沃尔玛购物卡3000元<span style={{color: '#7c9fbd'}}>&nbsp;&nbsp;可折合现金<span className="special-color">2400</span>元</span></li>
                                <li><img src={no3} alt=""/>现金1000元</li>
                                <li>
                                    <div className="left">4-10</div>
                                    <div className="right">ysl口红各一支<span style={{color: '#7c9fbd'}}>&nbsp;可折合现金200元</span></div>
                                </li>
                                <li>
                                    <div className="left">11-50</div>
                                    <div className="right">现金各20元</div>
                                </li>
                                <li>
                                    <div className="left">51-100</div>
                                    <div className="right">现金各10元</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to='/index' className="router-common">
                        <Button  wrapColor={{width:'60%'}} padColor={{border: '1px solid #fddb3d'}}  name="进入游戏"/>
                    </Link>

                    <div className="btn-flex">
                        <Link to={this.state.isOver ? {pathname:'/list',search:searchUrl,state: { modal: false }} : {pathname:'/alert',search:searchUrl,state: { modal: true,content:`中奖结果将于${this.state.endTime}公布` }}} 
                              className="router-common" style={{width:'40%'}}
                        >
                            <Button
                                padColor={{background: 'linear-gradient(#fa94a9, #eb4863)'}}
                                innerColor={{background: '#f65c82'}}
                                name="获奖名单"
                            />
                        </Link>
                        <Link to={{pathname:'/score',search:searchUrl}} className="router-common" style={{width:'40%'}}>   
                            <Button padColor={{background: 'linear-gradient(#79e0cf, #49b675)'}} innerColor={{background: '#2eceb4'}} name="我的成绩" path='/score'/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    renderLoadingGif(){
        return(
            <Loading />
        )
    }
  render() {
    return (
        this.state.isMount ? this.renderMainContent() : this.renderLoadingGif()
    );
  }
}

export default Info;
