import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, TextField } from '@material-ui/core';

import { styles } from '../../styles';
import { PatientCaseData } from '../../common';
import CaseCellsLayout from '../../components/cases/CaseCellsLayout';
import { Autocomplete } from '@mui/material';

const Cases = () => {
  const classes = styles();

  const history = useHistory();

  const [cases, setCases] = useState<PatientCaseData[]>([]);
  const [displayedCases, setDisplayedCases] = useState<PatientCaseData[]>([]);

  useEffect(() => {
    const casesArr: PatientCaseData[] = [];

    for (let i = 1; i <= 5; i++) {
      casesArr.push({
        caseName: `Brain ${i}`,
        caseDescription:
          'Left temporal lobe ring enhancing lesion with associated vasogenic edema.',
        patientName: 'Juan',
        patientBirthDate: new Date(),
        patientSex: 'Male',
        PatientWeight: 69,
        imageURL:
          'https://prod-images-static.radiopaedia.org/images/25899296/0c8c2658ce6f072ec207823e75f7c7_big_gallery.jpeg',
        hasDiagnostic: i % 2 === 0,
        isPublic: i % 2 === 0,
      });
    }

    setCases(casesArr);
    setDisplayedCases(casesArr);
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
