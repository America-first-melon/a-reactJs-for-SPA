import React , {Component} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Info from './info/info';
import Canvas from './info/canvas';
import Score from './info/score';
import List from './info/list';

export default class App extends Component{
    componentDidMount(){
        console.log('\n' +
            '              ,,,,,,\n' +
            '          o#\'9MMHb\':\'-,o,\n' +
            '       .oH":HH$\' "\' \' -*R&o,\n' +
            '      dMMM*""\'`\'      .oM"HM?.\n' +
            '    ,MMM\'          "HLbd< ?&H\\\n' +
            '   .:MH ."\\          ` MM  MM&b\n' +
            '  . "*H    -        &bycarmeloM:\n' +
            '  .    dboo        MMMMMMMMMMMM.\n' +
            '  .   dMMMMMMb      *MMMMMMMMMP.\n' +
            '  .    MMMMMMMP        *MMMMMP .\n' +
            '       `#MMMMM           MM6P ,\n' +
            '   \'    `MMMP"           HM*`,\n' +
            '    \'    :MM             .- ,\n' +
            '     \'.   `#?..  .       ..\'\n' +
            '        -.   .         .-\n' +
            '          \'\'-.oo,oo.-\'\'')
    };
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Info} />
                    <Route path='/index' component={Canvas} />
                    <Route path='/score' component={Score} />
                    <Route path='/list' component={List} />
                </Switch>
            </div>
        )
    }
}
