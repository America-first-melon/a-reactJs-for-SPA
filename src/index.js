import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import App from './app';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <Route component={App} />
    </Router>, document.getElementById('root'));
registerServiceWorker();
