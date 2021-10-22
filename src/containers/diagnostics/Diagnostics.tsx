import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';

import { PatientCaseData } from '../../common';
import { styles } from '../../styles';
import CaseCellsLayout from '../../components/cases/CaseCellsLayout';
import axios from 'axios';

const Diagnostics = () => {
  const classes = styles();

  const [cases, setCases] = useState<PatientCaseData[]>([]);
  const [displayedCases, setDisplayedCases] = useState<PatientCaseData[]>([]);

  useEffect(() => {
    axios('http://localhost:3001/diagnostics/get-all-public', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        start: 0,
        end: 10,
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
      <h1>Diagnostics</h1>
      <div className={classes.displayRows}>
        <Autocomplete
          disablePortal
          options={cases.map((caseData) => caseData.caseName)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Search diagnostics'
            />
          )}
          onChange={(_: any, caseNameInput: string | null) => {
            showSelectedCase(caseNameInput);
          }}
        />
        <CaseCellsLayout cases={displayedCases} isEditing={false} />
      </div>
    </div>
  );
};

export default Diagnostics;
