import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import Home from "./home/Home.js";
import Events from "./events/Events.js";
import Galery from "./galery/Galery.js";
import About from "./about/About.js";
import Settings from "./settings/Settings.js";
import Page404 from "./components/Page404.js";

ReactDOM.render(
	<BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/galery" component={Galery} />
      <Route exact path="/about" component={About} />
      <Route exact path="/settings" component={Settings} />
      <Route component={Page404} />
    </Switch>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
