
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

export const oImage = {
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

export const width = document.documentElement.clientWidth;
export const height = document.documentElement.clientHeight-64;

export function imgPreload(srcs,callback){
    let count = 0,imgNum = 0,images = {};
    for(let src in srcs){
        imgNum++;
    };
    for(let src in srcs ){
        images[src] = new Image();
        images[src].onload = function(){
            if (++count >= imgNum){
                callback(images);
            }
        }
        images[src].src = srcs[src];
    }
};

