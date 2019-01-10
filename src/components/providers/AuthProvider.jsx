import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { Route } from 'react-router-dom';

// Pour décoder le token
var jwtDecode = require('jwt-decode');

const {
  Provider: AuthContextProvider,
  Consumer: AuthContext,
} = React.createContext();

const mutLogin = gql`
mutation ($email: String!, $password: String!){
  login(email:$email, password:$password){
    token
  }
}
  `;

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      userMail: null,
      userToken: null,

      error: null,

      signIn: this.signIn,
      signOut: this.signOut,
    };
  }

  // TODO
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      // Récupéréer client.query()
    }
  }

  /**
   * Permet de se loguer et de récupérer le token de l'utilisateur
   */
  signIn = ( userEmail, password ) => {
    const { client } = this.props;
    client.mutate({ mutation: mutLogin, variables: {  email: userEmail, password: password} }).then(
      (data) => {
        const { token } = data.data.login.token;
        const decoded = jwtDecode(data.data.login.token);
        this.setState({
          userID: decoded.id,
          userMail: decoded.email,
          userToken: token,

          error: null,
        });
      }

    ).catch(error => {
      console.log(error);
      this.setState({ error: 'Wrong credentials' });
    }); 
  };

  /**
   * Permet de se de-loguer
   */
  signOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <AuthContextProvider value={this.state}>
          {children}
        </AuthContextProvider>
      </>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: null,
};

export { AuthContext };
export default withApollo(AuthProvider);
