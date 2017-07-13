'use strict';

import 'styles/style.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Home from 'components/Home/Home';
import Signup from 'components/Home/Signup';

render((
	<Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/signup" component={Signup} />
  </Router>
), document.getElementById('js-main'));
