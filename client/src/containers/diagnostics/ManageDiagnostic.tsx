import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import { Button, FormControlLabel, Switch } from '@material-ui/core';

import Diagnostic from '../../components/diagnostics/Diagnostic';
import { DiagnosticData, PatientCaseData } from '../../common';
import { styles } from '../../styles';
import { mergeObjects } from '../../common/utils';

const ManageDiagnostic = () => {
  const classes = styles();

  const history = useHistory();
  const locationState = useLocation().state as {
    patientCaseData: PatientCaseData;
    diagnosticData: DiagnosticData;
  };

  const [diagnosticData, setDiagnosticData] = useState(
    locationState.diagnosticData,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    visibilityOrPrivacy: number,
  ) => {
    changeVisibility(visibilityOrPrivacy);
  };

  const deleteDiagnostic = async () => {
    await axios(`/api/diagnostics/${locationState.patientCaseData.id}/delete`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
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

  const changeVisibility = async (visibilityOrPrivacy: number) => {
    const newData = {
      isPublic:
        visibilityOrPrivacy === 0
          ? !diagnosticData.isPublic
          : diagnosticData.isPublic,
      isAnonymous:
        visibilityOrPrivacy === 1
          ? !diagnosticData.isAnonymous
          : diagnosticData.isAnonymous,
    };

    setDiagnosticData(mergeObjects(diagnosticData, newData));

    await axios(
      `/api/diagnostics/${locationState.patientCaseData.id}/change-visibility`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: newData,
        withCredentials: true,
        responseType: 'json',
      },
    ).then(
      (res) => {},
      (err) => {
        console.log(err);
      },
    );
  };

  return (
    <div className={classes.displayRows}>
      <Diagnostic
        patientCaseData={locationState.patientCaseData}
        diagnosticData={diagnosticData}
        isEditing={true}
      />

      <div className={classes.displayRowsButtons}>
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={diagnosticData.isPublic}
              onChange={(event) => handleChange(event, 0)}
            />
          }
          label='Public'
        />
        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={diagnosticData.isAnonymous}
              onChange={(event) => handleChange(event, 1)}
            />
          }
          label='Anonymous'
        />

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
