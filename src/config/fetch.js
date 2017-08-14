import 'whatwg-fetch';

import {ROOT_URL} from "./index";

export function  get(url,params) {
    if(params){
        let dataStr = '';
        Object.keys(params).forEach(key => {
            dataStr += key + '=' + params[key] + '&'
        });
        if(dataStr !== ''){
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = ROOT_URL + url + '?' + dataStr
        }
        console.log('get'+url)
    }
    return fetch(url)
        .then(function(response) {
            if(response.status === 200){
                return response.json()
            }else{
                alert(response.status+'  '+response.statusText);
                return false;
            }
        }, function(error) {
            console.log(error)
        })
};

export function post (url,data) {
    url = ROOT_URL + url;
    console.log('post'+url);
    return fetch(url,{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        }).then(function(response) {
            if(response.status === 200){
                return response.json()
            }else{
                alert(response.status+'  '+response.statusText);
                return false;
            }
        }, function(error) {
            console.log(error)
     })
};


