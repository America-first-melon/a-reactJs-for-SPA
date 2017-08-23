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
    backAndStart = (e) => {
        let searchUrl = this.props.location.search;
        e.stopPropagation();
        this.props.history.replace({pathname:'/index',search:searchUrl,state: { modal: false ,isStart:true }})
    }
    renderBtn(){
        let btnObj = this.props.location.state.btn;
        console.log(btnObj)
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
                <div onClick={()=>{console.log(2)}}>
                    <Button 
                        wrapColor={{width:'60%'}} 
                        padColor={btnObj.padColor} 
                        innerColor={btnObj.innerColor}  
                        name={btnObj.text}
                    />
                </div>
            )
        }else{
            return(
                <div onClick={()=>{console.log(3)}}>
                    <Button 
                        wrapColor={{width:'60%'}} 
                        padColor={btnObj.padColor} 
                        innerColor={btnObj.innerColor}  
                        name={btnObj.text}
                    />
                </div>
            )
        }
    }
    render(){
        return(
            <div className="common-pos html-wrap" style={{backgroundColor:'rgba(0,0,0,0.5)',zIndex:'100'}}>
                <div className="common-pos alert-common" style={alertBgStyle}>
                    <img src={Xbtn} className="alert-close" onClick={this.back} alt="alet"/>
                    <div className="modal-content">{this.props.location.state.content}</div>
                    {this.renderBtn()}
                </div>
            </div>
        )
    }
}