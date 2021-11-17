import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, TextField } from '@material-ui/core';

import { styles } from '../../styles';
import { PatientCaseData } from '../../common';
import CaseCellsLayout from '../../components/cases/CaseCellsLayout';
import { Autocomplete } from '@mui/material';
import axios from 'axios';

const Cases = () => {
  const classes = styles();

  const history = useHistory();

  const [cases, setCases] = useState<PatientCaseData[]>([]);
  const [displayedCases, setDisplayedCases] = useState<PatientCaseData[]>([]);

  useEffect(() => {
    axios('/api/cases/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      (res) => {
        res.data.sort((a: PatientCaseData, b: PatientCaseData) =>
          a.caseName > b.caseName ? 1 : -1,
        );

        setCases(res.data);
        setDisplayedCases(res.data);
      },
      (err) => {
        return;
      },
    );
  }, []);

  const showSelectedCase = (caseNameInput: string | null) => {
    if (caseNameInput !== null) {
      setDisplayedCases(cases.filter((r) => r.caseName === caseNameInput));
    } else {
      setDisplayedCases(cases);
    }
  };

  return (
    <div>
      <h1>My Cases</h1>
      <div className={classes.displayRows}>
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
        <Autocomplete
          disablePortal
          options={cases.map((caseData) => caseData.caseName)}
          renderInput={(params) => (
            <TextField {...params} variant='outlined' label='Search cases' />
          )}
          onChange={(_: any, caseNameInput: string | null) => {
            showSelectedCase(caseNameInput);
          }}
        />
        <CaseCellsLayout cases={displayedCases} isEditing={true} />
      </div>
    </div>
  );
};

export default Cases;
