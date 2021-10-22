import React from 'react';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import { Button } from '@material-ui/core';

import Diagnostic from '../../components/diagnostics/Diagnostic';
import { DiagnosticData, PatientCaseData } from '../../common';
import { styles } from '../../styles';

const ManageDiagnostic = () => {
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
          Publish diagnostic
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={deleteDiagnostic}
        >
          Delete diagnostic
        </Button>
        <Button
          variant='contained'
          onClick={() =>
            history.push({
              pathname: '/home',
              state: { currentTab: 1 },
            })
          }
        >
          Return to my cases
        </Button>
      </div>
    </div>
  );
};

export default ManageDiagnostic;
