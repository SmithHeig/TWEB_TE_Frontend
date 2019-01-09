import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Header from './components/Header';

import {
  PageAcceuil,
  PageError404,
  PageLogin,
  PageWelcom,
} from './components/pages/Pages';

import AuthContext from './components/providers/AuthProvider';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    paddingTop: '64px',
  },
  appBar: {
    position: 'absolute',
    zIndex: 1900,
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
});

const ProtectedRoute = ({ Component: Component, ...rest }) => (
  <Route {...rest} render={(params) => (
    <AuthContext>
      {({ userToken }) => !userToken
        ? <Component {...params} />
        : <Redirect to="/login" />}
    </AuthContext>
  )}
  />
);


class App extends React.Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.page} center="xs">
          <Switch>
            <ProtectedRoute path="/" exact component={PageAcceuil} />
            <Route path="/login" component={PageLogin} />
            <ProtectedRoute path="/welcome" exact component={PageWelcom} />
            <Route path="*" component={PageError404} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
