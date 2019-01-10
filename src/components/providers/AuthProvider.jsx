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




  signIn = ( userEmail, password ) => {
    const { client } = this.props;
    console.info("mon")
    console.info(password);
    client.mutate({ mutation: mutLogin, variables: { email: userEmail, password: password } })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });

    /*
    client.mutate({ mutation: mutLogin, variables: { email, password } }).then(
      (data) => {
        const errors = null;
        if (errors) {
          console.log(errors)
          this.setState({ error: 'Oups an error occured. Please check the consoleeee' });
          return;
        }
        console.info(data);
      }

    ).catch(error => {
      console.log(client);
      console.log(error);
      this.setState({ error: 'Oups an error occured. Please check the console' });
    }); */
  };

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
