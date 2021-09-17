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
        <Button variant='contained' onClick={() => history.push('/home')}>
          Return to diagnostics
        </Button>
      </div>
    </div>
  );
};

export default ViewDiagnostic;
