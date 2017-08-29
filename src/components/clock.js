/**
 * create by Carmelon ANthony 2017-07
 */

import React, { Component } from 'react';

import Clock from '../images/clock.png';

import './count.css';

export class TimeComponent extends Component{
    render(){
        return(
            <div className="canvas-count-common">
                <img src={Clock} width="32px" height="32px" alt="avator" className="user-clock"/>
                <div id="countTime">0.000</div>
            </div>
        )
    }
}

let timer = null,
    clickStamp;

//开始计时
export function startTime(){
    clearInterval(timer);
    document.getElementById("countTime").innerText=0.000;
    clickStamp = (new Date()).valueOf();  
    timer = setInterval(go,1);
}

function go(){ 
    document.getElementById("countTime").innerText = changeTimeStamp(clickStamp);  
}

function changeTimeStamp(timeStamp){
    var distancetime = new Date().getTime() - new Date(timeStamp).getTime();  
    if(distancetime > 0){ 
        var ms = Math.floor(distancetime%1000); 
        var sec = Math.floor(distancetime/1000); 
        if(ms<100){
            ms = "0"+ ms;
        }
        if(sec<10){
            sec = "0"+ sec;
        }
        return sec + "." +ms;
    }
}       

//结束计时
export function getTime(){  
    clearInterval(timer)
}

// 格式化时间
export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
    return currentdate;
}