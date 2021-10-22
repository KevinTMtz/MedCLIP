import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from '@material-ui/core';

import Diagnostic from '../../components/diagnostics/Diagnostic';
import { DiagnosticData, PatientCaseData } from '../../common';
import { styles } from '../../styles';

const ViewDiagnostic = () => {
  const classes = styles();

  const history = useHistory();
  const locationState = useLocation().state as {
    patientCaseData: PatientCaseData;
    diagnosticData: DiagnosticData;
  };

  return (
    <div className={classes.displayRows}>
      <Diagnostic
        patientCaseData={locationState.patientCaseData}
        diagnosticData={locationState.diagnosticData}
      />

      <div className={classes.displayRowsButtons}>
        <Button
          variant='contained'
          onClick={() =>
            history.push({
              pathname: '/home',
              state: { currentTab: 0 },
            })
          }
        >
          Return to diagnostics
        </Button>
      </div>
    </div>
  );
};

export default ViewDiagnostic;
