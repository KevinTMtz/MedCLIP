import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import App from './App';
import './styles/index.css';
import Homepage from './containers/Homepage';
import Landingpage from './containers/Landingpage';
import Loginpage from './containers/auth/Loginpage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <Switch>
        <Route exact path="/home">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Loginpage />
        </Route>
        <Route exact path="/register">
          <div>Register</div>
        </Route>
        <Route exact path="/">
          <Landingpage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
