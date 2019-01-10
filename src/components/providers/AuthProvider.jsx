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

/**
 * Mutation to login
 */
const mutLogin = gql`
mutation ($email: String!, $password: String!){
  login(email:$email, password:$password){
    token
    user{
        email
        id
    }
  }
}
  `;

/**
 * Query to get user information from his token
 */
const queryMe = gql`
  query($token: String!){
    me(token: $token){
      id
      email
    }
  }
`;

/**
 * Provider of authentification
 */
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

  /**
   * Récupère les identifiants si on a le token dans le localStorage
   */
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const { client } = this.props;
      client.query({ query: queryMe, variables: { token: token } }).then(
        (data) => {
          console.log(data);
          const { id, email } = data.data.me;
          this.setState({
            userID: id,
            userMail: email,
            userToken: token,
            error: null,
          });
        }
      ).catch(error => {
        console.error("Did not recover old session");
      });
    }
  }

  /**
   * Permet de se loguer et de récupérer le token de l'utilisateur
   */
  signIn = (userEmail, password) => {
    const { client } = this.props;
    client.mutate({ mutation: mutLogin, variables: { email: userEmail, password: password } }).then(
      (data) => {
        console.log(data.data.login);
        const { token } = data.data.login;
        const { id, email } = data.data.login.user;
        this.setState({
          userID: id,
          userMail: email,
          userToken: token,
          error: null,
        })
        console.log(token);
        window.localStorage.setItem('token', token);
      }

    ).catch((error) => {
      console.error(error);
      this.setState({ error: 'Wrong credentials' });
    });
  };

  /**
   * Permet de se de-loguer
   */
  signOut = () => {
    window.localStorage.removeItem('token'); // Remove le token du localstorage
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
