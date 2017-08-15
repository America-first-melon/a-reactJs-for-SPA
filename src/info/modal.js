import React, { Component } from 'react';

import './alert.css';

import Button from '../components/button';

/*背景 */
import Bg from '../images/alert3.png';
import Xbtn from '../images/close.png';


const alertBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

export default class Modal extends Component{
    back = (e) => {
        let searchUrl = this.props.location.search;
        e.stopPropagation();
        this.props.history.replace({pathname:'/index',search:searchUrl,state: { modal: false }})
    }
    render(){
        let btnObj = this.props.location.state.btn;
        console.log(btnObj);
        return(
            <div className="common-pos html-wrap" style={{backgroundColor:'rgba(0,0,0,0.5)',zIndex:'100'}}>
                <div className="common-pos alert-common" style={alertBgStyle}>
                    <img src={Xbtn} className="alert-close" onClick={this.back} alt="alet"/>
                    <div className="modal-content">{this.props.location.state.content}</div>
                    <Button 
                        wrapColor={{width:'60%'}} 
                        padColor={btnObj.padColor} 
                        innerColor={btnObj.innerColor}  
                        name={btnObj.text}
                        
                    />
                </div>
            </div>
        )
    }
}