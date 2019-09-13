import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route } from 'react-router-dom';
import LoginFormContainer from './login_signup/login_form_container';
import SignupFormContainer from './login_signup/signup_form_container';

import { AuthRoute } from '../util/route_util';
// import SearchContainer from './bench/search_container'

import WebLauncher from '../components/web_launcher/web_launcher';
const App = () => (
  <div>
    {/* <h1>Message from App Component that is placed in Root Component</h1> */}
 
    <Route exact path="/" component={GreetingContainer} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/signup" component={SignupFormContainer} />
    <Route exact path="/weblauncher" component={WebLauncher}/>


    {/* <Route exact path="/" component={SearchContainer} /> */}

  </div>
);

export default App;