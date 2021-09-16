import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles, createStyles, Theme, Button } from '@material-ui/core';

import { styles } from '../../styles';
import CaseCell from '../../components/cases/CaseCell';

const casesStyles = makeStyles((_: Theme) =>
  createStyles({
    cellsDiv: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '24px',
    },
  }),
);

const Cases = () => {
  const classesCases = casesStyles();
  const classes = styles();

  const history = useHistory();

  return (
    <div>
      <h1>My Cases</h1>
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
      </div>
      <div className={classesCases.cellsDiv}>
        <CaseCell hasDiagnostic={true} />
        <CaseCell hasDiagnostic={false} />
        <CaseCell hasDiagnostic={true} />
        <CaseCell hasDiagnostic={false} />
        <CaseCell hasDiagnostic={false} />
      </div>
    </div>
  );
};

export default Cases;
