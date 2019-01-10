import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CenteredPaper from '../items/CenteredPaper';

const styles = {
  paper: {
    backgroundColor: 'rgba(255, 10, 0, 1)',
  },
};

class PageAccueil extends Component {
  constructor(props) {
    super(props);
    document.title = 'Error 404';
  }

  render() {
    const { classes } = this.props;
    return (
      <CenteredPaper className={classes.paper}>
        <Typography variant="h3" color="secondary">This is the home page</Typography>
      </CenteredPaper>
    );
  }
}

export default withStyles(styles)(PageAccueil);
