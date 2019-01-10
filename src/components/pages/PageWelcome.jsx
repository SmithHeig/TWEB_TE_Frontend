import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CenteredPaper from '../items/CenteredPaper';
import SimpleTab from '../items/SimpleTab';

const styles = {
  paper: {
    backgroundColor: 'rgba(255, 10, 0, 1)',
  },
};

/**
 * Query to get users id
 */
const query = gql`
{
  users{
    id
  }
}
`;

/**
 * Change data structure from list of object to list of id
 * @param data
 * @returns {*} - list of ids
 */
const creatUserRows = data => data.map(u => [u.id]);

/**
 * Page Welcome
 */
class PageWelcome extends Component {
  constructor(props) {
    super(props);
    document.title = 'Error 404';
  }

  render() {
    const { classes } = this.props;
    return (
      <CenteredPaper className={classes.paper}>
        <Query query={query}>
          {({ data, loading, error }) => {
            if (error) return 'Oups an error occured. Please check the console';
            if (loading) return 'Loading...';
            
            return (
              <SimpleTab
                header={['id']}
                rows={creatUserRows(data.users)}
              />
            );
          }}
        </Query>
        

      </CenteredPaper>
    );
  }
}

export default withStyles(styles)(PageWelcome);
