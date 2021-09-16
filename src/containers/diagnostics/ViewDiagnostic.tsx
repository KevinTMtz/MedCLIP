import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from '@material-ui/core';

import Diagnostic from '../../components/diagnostics/Diagnostic';
import { PatientCaseData } from '../../common';
import { styles } from '../../styles';

const ViewDiagnostic = () => {
  const classes = styles();

  const history = useHistory();
  const locationState = useLocation().state as PatientCaseData;

  return (
    <div className={classes.displayRows}>
      <Diagnostic patientCaseData={locationState} diagnostic={'Tumor'} />

      <div className={classes.displayRowsButtons}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/home')}
        >
          Publish diagnostic
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => history.push('/edit-case')}
        >
          Edit case &amp; Delete diagnostic
        </Button>
        <Button variant='contained' onClick={() => history.push('/home')}>
          Return to my cases
        </Button>
      </div>
    </div>
  );
};

export default ViewDiagnostic;
