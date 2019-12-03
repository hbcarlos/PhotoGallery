import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./client/Home.js";
import Events from "./client/Events.js";
import Galleries from "./client/Galleries.js";
import About from "./client/About.js";
import LogIn from './admin/LogIn.js';
import Admin from "./admin/Admin.js";
import PageNotFound from "./components/PageNotFound.js";

ReactDOM.render(
	<BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/galleries" component={Galleries} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/notfound" component={PageNotFound} />
      <Redirect for="*" to="/notfound"/>
    </Switch>
	</BrowserRouter>,
	document.getElementById('root')
);