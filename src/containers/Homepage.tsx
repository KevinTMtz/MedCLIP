import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

import { styles } from '../styles';

const Homepage = () => {
  const classes = styles();

  const history = useHistory();

  return (
    <div>
      <h1>Homepage</h1>
      <div className={classes.displayRowsButtons}>
        <Button
          type='submit'
          value='saveAndDiagnostic'
          variant='contained'
          color='primary'
          onClick={() => history.push('/create-case')}
        >
          Create case
        </Button>
        <Button
          type='submit'
          value='saveAndDiagnostic'
          variant='contained'
          color='primary'
          onClick={() => history.push('/edit-case')}
        >
          Edit case
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
