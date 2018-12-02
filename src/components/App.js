import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
//import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import FormPage from './forms/Form';
import PostPage from './Post';
import PostMap from './PostMap';
import drawline from './drawline';

import * as routes from '../constants/routes';

import withAuthentication from './withAuthentication';

const App = () =>
  <Router>
    <div>
      <Navigation />

      
    
      
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
      <Route exact path={routes.FORM} component = {FormPage} />
      <Route exact path={routes.DRAWLINE} component = {drawline} />
      <Route path={routes.POST} component = {PostPage} />
      <Route exact path={routes.POSTMAP} component = {PostMap} />


    </div>
  </Router>

export default withAuthentication(App);