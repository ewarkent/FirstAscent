import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () =>
  <button
    type="button"
    onClick={auth.doSignOut}
    style={{ background: 'none', 
            border: 'none', 
            color: 'white', 
            fontSize: '20px', 
            font: 'Georgia serif',
            fontVariant: 'all-small-caps'
           }}
  >
    Sign Out
  </button>

export default SignOutButton;