import React from 'react';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import { Button } from '@material-ui/core';

import { DiagnosticData, PatientCaseData } from '../../common';
import Diagnostic from '../../components/diagnostics/Diagnostic';
import { styles } from '../../styles';

const ReviewDiagnostic = () => {
  const classes = styles();

  const history = useHistory();
  const locationState = useLocation().state as {
    patientCaseData: PatientCaseData;
    diagnosticData: DiagnosticData;
  };

  const deleteDiagnostic = async () => {
    await axios(
      `http://localhost:3001/diagnostics/${locationState.patientCaseData.id}/delete`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
        responseType: 'json',
      },
    ).then(
      (res) => {
        history.push({
          pathname: '/home',
          state: { currentTab: 1 },
        });
      },
      (err) => {
        console.log(err);
      },
    );
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
          color='primary'
          onClick={() => history.push('/home')}
        >
          Confirm diagnostic
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={async () => {
            await deleteDiagnostic();
            history.push({
              pathname: '/edit-case',
              state: locationState.patientCaseData,
            });
          }}
        >
          Edit case &amp; Dismiss diagnostic
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={async () => {
            await deleteDiagnostic();
            history.push({
              pathname: '/home',
              state: { currentTab: 1 },
            });
          }}
        >
          Dismiss diagnostic
        </Button>
      </div>
    </div>
  );
};

export default ReviewDiagnostic;
