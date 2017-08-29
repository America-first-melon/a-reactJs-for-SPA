import React, { Component } from 'react';

import md5 from 'js-md5'

import Header from '../components/header';

import {post} from '../config/fetch';
import {TimeComponent,startTime,getTime,getNowFormatDate} from '../components/clock';
import {CountComponent} from '../components/count';

import {width,height,oImage,imgPreload} from '../config/core';

import './canvas.css';

/*背景 图 音乐*/
import Bg from '../images/bg.jpg';
import Music from '../static/audio-long.mp3';
import Tap from '../static/audio-tap.mp3';
import play from '../images/close-audio.png';
import pause from '../images/start-audio.png';

const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

let canvasDom,ctx,bgAudio,tapAudio;

let circle,
    paoShow,
    axeaArray = [],
    paopaoArray = [],
    startTimer = null,
    hiddenTimer = null,
    upIngFunc,dropList = [],
    paoAxes = {},
    beginTime = 0;

 //1000/60定时器
function refreshConsFunc(callback){
    upIngFunc = setTimeout(callback,1000/60);
};

//造坐标
function createAxes(length){
    for(let i=0;i<length;i++){
        let mathx = Math.floor(Math.random()*((width-70)-70+1)+70);
        let mathy = Math.floor(Math.random()*((height-100)-100+1)+100);
        axeaArray.push({x:mathx,y:mathy});
    }
    return axeaArray;
}

//造泡泡
function createCircle(x, y) {
    var randomImgIndex = Math.ceil( Math.random() * 10 ) - 1;
    this.x = x;
    this.y = y;
    this.color = Math.random() * 360;
    this.render = function(c) {
        c.drawImage(paopaoArray[randomImgIndex],this.x,this.y,50,50)
    };
    this.update = function() {
        this.y -= 3
    }
}

//上升
function circleUping() {
    clearTimeout(upIngFunc);
    gameMethods.renderBg(); 
    if(paoShow){
        circle.render(ctx); 
        circle.update();
        refreshConsFunc(circleUping);
    }else{
        refreshConsFunc(circleUping);
    }
    boom.update();
}

let gameMethods = {
    axes:[
        {x:250,y:480},
        {x:200,y:300}
    ],
    getClickLocation:function(x,y){
        return{
            x: x - canvasDom.getBoundingClientRect().left,
            y: y - canvasDom.getBoundingClientRect().top 
        }
    },
    reset:function(){ 
        let randomIndex = Math.floor((Math.random()*gameMethods.axes.length));  
        paoAxes.x = gameMethods.axes[randomIndex].x;
        paoAxes.y = gameMethods.axes[randomIndex].y;
    },
    renderBg:function(){ 
        ctx.clearRect(0, 0, width, height);
    },
    renderPao:function(){
        if(!paoShow){
            circle = new createCircle(paoAxes.x, paoAxes.y);
            paoShow = true;
        }
    },
    hiddenPao:function(){  
        if(paoShow){ 
            hiddenTimer = setTimeout(function(){
                paoShow = false;
            },1000)  
        }
    },
    //每一秒执行一次
    gameStart:function(){
        clearTimeout(startTimer); // 清楚 上一次的定时器  执行之后 重新开始计算延迟时间
        if (!paoShow) {
            gameMethods.reset();// 生出几个随机生出球的位置
            gameMethods.renderPao();// 渲染 泡泡
            circleUping();// 球上升
            gameMethods.hiddenPao();// 球消失 
        }
                  
        startTimer = setTimeout(function(){
            gameMethods.gameStart();
        },1000/60); //  正常多久出现出现一个 小球
    }
}

  let boom = {
        getRgb:function(r,g,b){
            return "rgb("+ r+","+g+","+b+")";
        },
        createDrop:function(x,y,c){
            var mydrop={
                die:false,
                posx:x, // 点的位置
                posy:y,// 点的位置
                vx:(Math.random()-0.5)*4*2, // x 轴散开多少
                vy:(Math.random()*(-6)-3)*2,// 轴  散开多少
                radius:Math.random()*2+4, //圆形
                color:c
            };
            return mydrop;
        },
        // 小球变化
        update:function(){
            if(dropList.length>0){
                dropList.forEach(function (e) {
                    e.posx=e.posx+e.vx; // 炸开的泡  每次变化多少e.vx
                    e.posy=e.posy+e.vy;//炸开的泡 每次变化多少e.vy
                    if(e.posx>width || e.posx<0 || e.posy<0 || e.posy>height){
                        e.die = true;
                    }
                });
            }
            //气泡消失掉
            for(var i=dropList.length-1;i>=0;i--){
                if(dropList[i].die){
                    dropList.splice(i,1);
                }
            }
            boom.render();
        },
        // 生成小球
        render:function(){
            dropList.forEach(function (e) {
                ctx.beginPath();
                ctx.arc(e.posx,e.posy,e.radius,0,2*Math.PI);
                ctx.fillStyle=e.color;
                ctx.fill();
            });
        }
    }


export default class Canvas extends Component{
    constructor(props){
        super(props);
        this.state = {
            userParams : this.props.location.state.userParams,
            liveNumber : 0,
            clickNum: 0,
            userId:new URLSearchParams(this.props.location.search).get('user_id'),
            isAudioStop:true
        }
    }

    tongji = (paoNumber,isStart,useTime,timestamp,callbak) => {
        let sign = 'user_id='+this.state.userId+
                '|post_time='+getNowFormatDate()+
                '|state='+isStart+
                '|use_time='+useTime+
                '|pp_number='+paoNumber+
                '|region=SH|beginTime='+beginTime+
                '|phoneModel=null'+
                '|timestamp='+timestamp+
                '|salt=MIICXAIBAAKBgQCdW2RsHWN1BxiWky6V4';
        let jsonData = {
                post_time:getNowFormatDate(), 
                pp_number:paoNumber,
                phoneModel: "null",
                state:isStart,
                region: "SH",
                token: "",
                salt: 'MIICXAIBAAKBgQCdW2RsHWN1BxiWky6V4',
                beginTime: beginTime,
                sign:md5.hex(sign),
                timestamp: timestamp,
                user_id:this.state.userId,
                use_time:useTime,
        };
        post('/addGameRecord',jsonData).then(
            (res)=>{
                res.code = 1 && callbak();
            }
        )
    }
    
    componentWillMount(){
        post('/checkgamenumber',{user_id:this.state.userId}).then(
            (Response)=>{
                this.setState({
                    liveNumber:Response.live_number
                },function(){
                    if(Response.live_number>0){
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
                                    clickFunc:1
                                } 
                            }
                        })
                    }else{
                        this.props.history.replace({
                            pathname:'/modal',
                            search:this.props.location.search,
                            state: { 
                                modal: true,
                                content:`今天的三次机会用完了`,
                                desc:'分享可增加一次次数',
                                btn:{
                                    text:'去分享',
                                    padColor:{background:'linear-gradient(#fa94a9, #eb4863)'},
                                    innerColor:{background:'#f65c82'},
                                    clickFunc:2
                                } 
                            }
                        })
                    }
                })
            }
        );


        gameMethods.axes = createAxes(Number(this.state.userParams.map_pp_number))
        
        imgPreload(oImage,function(images){
            for(var i in images){
                paopaoArray.push(images[i])
            };
        });
    }

    
    componentDidMount(){
        canvasDom = document.getElementById("ppCanvas");
        ctx = canvasDom.getContext('2d');
        bgAudio = document.getElementById("long-bg");
        tapAudio = document.getElementById("tap-audio");
        tapAudio.playbackRate = 2;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.history.location.state.isStart){
            bgAudio.play();
            this.setState({
                clickNum:0
            });
            beginTime = new Date().getTime();
            startTime();
            gameMethods.gameStart();
        }
    }

    canvasClickFunc = (event) =>{
        event.preventDefault();
        let locationAxes = gameMethods.getClickLocation(event.clientX, event.clientY);
        if(paoShow && (locationAxes.x > circle.x) && (locationAxes.x < circle.x + 50) &&  (locationAxes.y>circle.y) && (locationAxes.y < circle.y+50)  ){
            tapAudio.play();
            tapAudio.currentTime = 0;
            let locationColoArray = ctx.getImageData(locationAxes.x,locationAxes.y,1,1).data;
            let locationColor = 'rgba('+locationColoArray[0]+','+locationColoArray[1]+','+locationColoArray[2]+',255)';
            paoShow = false;

            clearTimeout(hiddenTimer); // 球球被点了 清除掉 hiddenPao  定时器
            
            for(var i=0;i<6;i++){
                dropList.push(boom.createDrop(event.clientX,event.clientY,locationColor));
            };
            
            this.setState({
                clickNum : this.state.clickNum+1
            },function(){
                if(this.state.clickNum == 3){
                    let _this = this;
                    getTime();
                    clearTimeout(startTimer); //清掉 开始定时器 （查询 球 状态的定时器）
                    clearTimeout(upIngFunc); // 清掉   更新画布定时器
                    dropList = []
                    gameMethods.renderBg();// 清空画布
                    this.tongji(50,1,Number(document.getElementById("countTime").innerText*1000),new Date().getTime(),function(){
                        _this.props.history.replace({
                            pathname:'/modal/score',
                            search:_this.props.location.search,
                            state: { 
                                modal: true,
                                isShowScore:true,
                                useTime:Number(document.getElementById("countTime").innerText)
                            }
                        })
                    })
                }   
            })
            // clearTimeout(startTimer);
        }
    }

    audioClickFunc = () => {
        this.setState({
            isAudioStop:!this.state.isAudioStop
        },function(){
            this.state.isAudioStop ? bgAudio.play() : bgAudio.pause();
        })
    }

    render(){
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="戳泡泡" />
                <audio src={Music} loop id="long-bg"></audio>
                <audio src={Tap} id="tap-audio"></audio>
                <div className="canvas-count-wrap">
                    <CountComponent clickNum={this.state.clickNum} avatar={this.state.userParams.avatar}/>
                    <TimeComponent />
                </div>
                <canvas className="maopaoCanvas" width={width} height={height} id="ppCanvas" onClick={this.canvasClickFunc}></canvas>
                <div className="audio-wrap" onClick={this.audioClickFunc}>
                    {
                        this.state.isAudioStop ?  <img src={play} /> : <img src={pause} />
                    }
                </div>
            </div>
        )
    }
}