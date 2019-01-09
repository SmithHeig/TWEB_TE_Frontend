import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import { Route } from 'react-router-dom';

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

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      // Récupéréer client.query()
    }
  }

  signIn = ({ userMail, password }) => {
    this.setState({
      userID: null,
      userMail: null,
      userToken: null,
      error: '',
    });
  }

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
