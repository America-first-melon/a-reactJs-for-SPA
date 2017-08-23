import React, { Component } from 'react';

import Header from '../components/header';

import {post} from '../config/fetch';
import {TimeComponent,startTime} from '../components/clock';
import {CountComponent} from '../components/count';


import './canvas.css';

/*背景 图 音乐*/
import Bg from '../images/bg.jpg';
import Music from '../static/audio-long.mp3';
import Tap from '../static/audio-tap.mp3';

import pao0 from '../images/paopao/pao0.png';
import pao1 from '../images/paopao/pao1.png';
import pao2 from '../images/paopao/pao2.png';
import pao3 from '../images/paopao/pao3.png';
import pao4 from '../images/paopao/pao4.png';
import pao5 from '../images/paopao/pao5.png';
import pao6 from '../images/paopao/pao6.png';
import pao7 from '../images/paopao/pao7.png';
import pao8 from '../images/paopao/pao8.png';
import pao9 from '../images/paopao/pao9.png';


const infoBgStyle = {
    backgroundImage: 'url('+Bg+')'
}

let  canvasDom,
      ctx;
    const   width = document.documentElement.clientWidth,
      height = document.documentElement.clientHeight;

const oImage = {
    "pao0":pao0,
    "pao1":pao1,
    "pao2":pao2,
    "pao3":pao3,
    "pao4":pao4,
    "pao5":pao5,
    "pao6":pao6,
    "pao7":pao7,
    "pao8":pao8,
    "pao9":pao9
}

const maopaoCanvas = {
    width:width,
    height:height
}

let circle,
    paoShow,
    axeaArray = [],
    paopaoArray = [],
    startTimer = null,
    hiddenTimer = null,
    upIngFunc,dropList = [],
    paoAxes = {};

 //初始泡泡
function imgPreload(srcs,callback){
    let count = 0,imgNum = 0,images = {};
    for(let src in srcs){
        imgNum++;
    };
    for(let src in srcs ){
        images[src] = new Image();
        images[src].onload = function(){
            //判断是否所有的图片都预加载完成
            if (++count >= imgNum){
                callback(images);
            }
        }
        images[src].src = srcs[src];
    }
};

 //1000/60定时器
function refreshConsFunc(callback){
    // this.setState({
    //     upIngFunc:setTimeout(callback,1000/60)
    // })
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
    // 0.5 -  0.7  正负
    // 0到9的随机数
    let randomImgIndex = Math.ceil( Math.random() * 10 ) - 1;
    this.hbol = true;
    this.wbol = true;
    this.x = x;
    this.y = y;
    this.color = Math.random() * 360;
    this.xVel = Math.random() * 5 - 2;
    this.render = function(c) {
        c.drawImage(paopaoArray[randomImgIndex],this.x,this.y,50,50)
    };
    this.sixs = function(){
        var random= (Math.floor(Math.random() * (9 - 6 + 1)) + 6)/10;  
        if (random>0.7) {
            this.hbol = false;  
            this.wbol = false; 
        }
        return random;
    }
    this.wspeed = (Math.floor(Math.random() * (9 - 0 + 1)) + 0)/10;
    this.hspeed = this.sixs()
    this.update = function() {
        if(this.y-50<=0){
            this.wspeed = this.sixs()
            this.hbol = false;
        }
        if(this.y+50>=height){
            this.wspeed = this.sixs()
            this.hbol = true;
        }
        if (this.hbol){
            this.y -= this.hspeed //，每次上升0.6
        }else{
            this.y += this.hspeed
        }
        // 左右
        if(this.x<=0){
            this.hspeed = this.sixs()
            this.wbol = false;
        }
        if(this.x+50 >= width){
            this.hspeed = this.sixs()   
            this.wbol = true;
        }
        if (this.wbol){
            this.x -= this.wspeed
        }else{
            this.x += this.wspeed
        }
    }
}

//上升
function circleUping() {
    clearTimeout(upIngFunc);
    // clearTimeout(this.state.upIngFunc);
    gameMethods.renderBg(); //请空画布

    if(paoShow){
        circle.render(ctx); // 随机 造球
        circle.update();// 球 y 轴变化   往上升
        refreshConsFunc(circleUping);
    }else{
        refreshConsFunc(circleUping);
    }
    boom.update();//里边有render 和消失
}



let gameMethods = {
    axes:[
        {x:250,y:480},
        {x:200,y:300}
    ],
    getClickLocation:function(x,y){
        let reatLocation = canvasDom.getBoundingClientRect();
        return{
            x:(x-reatLocation.left) * (canvasDom.width / reatLocation.width),
            y:(y-reatLocation.top) * (canvasDom.height / reatLocation.height)  
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
            },700)  
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
                  
        //startTimer = setTimeout(gameMethods.gameStart(),1000/60); //  正常多久出现出现一个 小球
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
    //                            e.vy=e.vy+0.5;
                    e.posy=e.posy+e.vy;//炸开的泡 每次变化多少e.vy
                    if(e.posx>width || e.posx<0 || e.posy<0 || e.posy>height){
                        // 靠边了     气泡消失掉
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
            liveNumber : 0
        }
    }
    
    componentWillMount(){
        let param = new URLSearchParams(this.props.location.search).get('user_id');
        post('/checkgamenumber',{user_id:param}).then(
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
                                content:`没机会了`,
                                btn:{
                                    text:'去分享',
                                    padColor:{background:'linear-gradient(#79e0cf,#49b675)'},
                                    innerColor:{background:'#2eceb4'},
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
        
    }
    componentDidUpdate(){
        if(this.props.location.state.isStart){
            startTime();
            gameMethods.gameStart();
        }
    }

    render(){
        return(
            <div className="common-pos html-wrap" style={infoBgStyle}>
                <Header title="戳泡泡" />
                <audio src={Music} loop id="long-bg"></audio>
                <audio src={Tap} id="tap-audio"></audio>
                <div className="canvas-count-wrap">
                    <CountComponent avatar={this.state.userParams.avatar}/>
                    <TimeComponent />
                </div>


                <canvas style={maopaoCanvas} id="ppCanvas" ref='ttttt'></canvas>
            </div>
        )
    }
}