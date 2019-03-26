// import React from 'react';
// import { withRouter, Switch, Route } from 'react-router-dom';

// import { Navigation } from '../../components';

// const App = (props) => {
//   return (
//     <Switch>
//       <Route exact path="/" component={Navigation} />
//     </Switch>
//   )
// }

// export default withRouter(App);


import React, { Component } from 'react';
import { withRouter, Switch, Route, NavLink, HashRouter } from 'react-router-dom';
import { Home, Stuff, Contact, Blog } from "../../components";
import './App.scss';


const App = (props) => {
  return (
        <div className="App">
          <HashRouter>
            <header>
              <h1>Simple SPA</h1>
              <ul className="header">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/stuff">Stuff</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>
              </ul>
              <div className="content">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/stuff" component={Stuff}/>
                <Route exact path="/contact" component={Contact}/>
                <Route exact path="/blog" component={Blog}/>
              </Switch>
              </div>
            </header>
          </HashRouter>
        </div>
    );
  }

export default withRouter(App);
