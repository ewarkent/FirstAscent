import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

import './css/Navigation.css'

// Use this to handle whether or not a user is logged in a session.
const Navigation = () =>

  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

// Conditional rendering of user login status.
/*
const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>
*/

// What users can see if they're logged in.
const NavigationAuth = () =>
  <div className='mainpage'>
    <div className='navbar'>

      {/*<h1>NavigationAuth</h1>
      <p>This page should show if user is authorized.</p>
      <p>End product should show this as some sort of bar, like most webpages with sign-in</p>*/}
      <div className='navcontent'>
        <ul className='links'>
        {/**<Link className='landinglink' to={routes.LANDING}>Landing</Link>*/}
          <li><Link className='homelink' to={routes.HOME}>Home</Link></li>
          <li><Link className='formlink' to={routes.FORM}>New Climb</Link></li>
          {/**<Link className='drawlinelink' to={routes.DRAWLINE}>DrawLines</Link>*/}
          <div className='Title'>First Ascent</div>
          <li><Link className='accountlink' to={routes.ACCOUNT}>Account</Link></li>
          <li><div className='signoutbutton'><SignOutButton /></div></li>
        </ul>
      </div>
    </div>
  </div>

const NavigationNonAuth = () =>
  <div className='mainpage'>
    <div className='Title'>First Ascent</div>
    <div className='navbar'>
      {/*<h1>NagivationNonAuth</h1>
        <p>This page should show if user is not authorized.</p>
        <p>End product should show this as some sort of bar, like most webpages with sign-in</p>
          <li><Link to={routes.LANDING}>Landing</Link></li>
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>*/}

      <div className='links'>
      {/**<Link className='landinglink' to={routes.LANDING}>Landing</Link>*/}
        <Link className='signinlink' to={routes.SIGN_IN}>Sign In</Link>
      </div>


    </div>
  </div>

export default Navigation;