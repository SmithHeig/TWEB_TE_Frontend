import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    weight: '100%',
    height: '64px',
    top: 0,
    shadow: 'none',
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -7,
    marginRight: 20,
    paddingTop: 4,
    height: '60px',
    outline: 'none',
  },
  LinkButton: {
    textDecoration: 'none',
    color: 'secondary',
  }
};

function MenuAppBar(props) {
  const { classes } = props;

  const menuLarge = (
    <>
      <Link to="/" className={classes.LinkButton} readOnly tabIndex="-1"><Button id="accueilButton">Accueil</Button></Link>
      <Link to="/welcome" className={classes.LinkButton} readOnly tabIndex="-1"><Button id="mapButton">welcome</Button></Link>
      <Link to="/login" className={classes.LinkButton} readOnly tabIndex="-1"><Button id="aboutButton">login</Button></Link>
    </>
  );

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <div className={classes.grow} />
          {menuLarge}
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
