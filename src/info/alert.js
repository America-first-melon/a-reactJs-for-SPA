import React, { Component } from 'react';

import './alert.css';

/*背景 */
import Bg from '../images/alert3.png';
import Xbtn from '../images/close.png';


const alertBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

export default class Alert extends Component{
    back = (e) => {
        this.props.location.state.updateUrl ? window.location.href = "http://m.maopp.cn" : (()=>{e.stopPropagation() ; this.props.history.goBack()})();
    }
    render(){
        return(
            <div className="common-pos html-wrap" style={{backgroundColor:'rgba(0,0,0,0.5)',zIndex:'100'}}>
                <div className="common-pos alert-common" style={alertBgStyle}>
                    <img src={Xbtn} className="alert-close" onClick={this.back} alt="alet"/>
                    <p className="alert-content">{this.props.location.state.content}</p>
                </div>
            </div>
        )
    }
}