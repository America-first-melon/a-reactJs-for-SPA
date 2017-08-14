import React, { Component } from 'react';
import {post} from '../config/fetch';

import no1 from '../images/no1.png';
import no2 from '../images/no2.png';
import no3 from '../images/no3.png';

export default class RanksListComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            pageNum : 0,
            rowCount : 0,
            ranksList : []
        }
        this.scrollFunc = this.scrollFunc.bind(this)
    }
    fetchRankList(pageNum){    
        post(this.props.fetch,{pageIndex: pageNum, pageSize: 11}).then(
            (Response)=>{
                this.setState({rowCount:Response.rowCount})

                let tempArray = this.state.ranksList;

                if(pageNum == 0){
                    this.setState({
                        ranksList:Response.data,
                    });
                }else{
                    this.setState({
                        ranksList:tempArray.concat(Response.data),
                    });
                }
                
            }
        )
    }
    componentWillMount(){
        this.fetchRankList(0);
    }
    componentDidMount(){
        document.getElementById("dataList").addEventListener('scroll',this.scrollFunc)
    }
    componentWillUnmount(){
        document.getElementById("dataList").removeEventListener('scroll',this.scrollFunc)
    }
    scrollFunc(e){
        let refsDom = e.target,
            pageNum = this.state.pageNum+1;

        if(refsDom.scrollTop + refsDom.clientHeight >= refsDom.scrollHeight -5){
            if(pageNum <= Math.floor(this.state.rowCount/11)){
                this.setState({
                    pageNum:pageNum
                },this.fetchRankList(pageNum))
            }else{
                return false
            }
        }
    }
    
    render(){
        return(
                <ul id="dataList" >{
                    this.state.ranksList.map((ele, index) => {
                      return (
                                <RanksItemComponent ele={ele} ranks={index} key={index} />
                            );
                        })
                    }
                </ul>
        )
    }
}

class RanksItemComponent extends Component{
    renderIndex = () => {
        let index = this.props.ranks;
        if(index === 0){
            return <img src={no1} alt="no1" />
        }else if(index === 1){
            return <img src={no2} alt="no2" />
        }else if(index === 2){
            return <img src={no3} alt="no3" />
        }else{
            return <span className="span1">{index+1}</span>
        }
    }
    render(){
        return(
             <li>
                 {this.renderIndex()}
                 <img src={this.props.ele.avator == null ? 'http://www.maopp.cn/imgs/maopao_logo.png' : this.props.ele.avator}/>
                 <span className="span35">{this.props.ele.user_name == null ? '测试用户' : this.props.ele.user_name}</span>
                 <span className="span2">{this.props.ele.use_milsecond/1000}秒</span>
             </li>
        )
    }
};