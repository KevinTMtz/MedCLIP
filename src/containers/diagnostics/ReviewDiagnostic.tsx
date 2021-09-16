import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from '@material-ui/core';

import { PatientCaseData } from '../../common';
import Diagnostic from '../../components/diagnostics/Diagnostic';
import { styles } from '../../styles';

const ReviewDiagnostic = () => {
  const classes = styles();

  const history = useHistory();
  const locationState = useLocation().state as PatientCaseData;

  const [diagnostic] = useState('Tumor');

  return (
    <div>
      <Diagnostic patientCaseData={locationState} diagnostic={diagnostic} />

      <div className={classes.displayRowsButtons}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/home')}
        >
          Confirm diagnostic
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => history.push('/edit-case')}
        >
          Edit case &amp; Dismiss diagnostic
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => history.push('/home')}
        >
          Dismiss diagnostic
        </Button>
      </div>
    </div>
  );
};

export default ReviewDiagnostic;
