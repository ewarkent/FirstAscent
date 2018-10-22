import React from 'react';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';

/**
 * Session handling component. Uses higher-order functions
 *  to keep handling away from App.js. For reusability/ maintainability.
 */

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    render() {
        const { authUser } = this.state;
        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...this.props} />
            </AuthUserContext.Provider>
        );
    }
}

export default withAuthentication;