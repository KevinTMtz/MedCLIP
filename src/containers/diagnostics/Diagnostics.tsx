import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';

import { PatientCaseData } from '../../common';
import { styles } from '../../styles';
import CaseCellsLayout from '../../components/cases/CaseCellsLayout';

const Diagnostics = () => {
  const classes = styles();

  const [cases, setCases] = useState<PatientCaseData[]>([]);
  const [displayedCases, setDisplayedCases] = useState<PatientCaseData[]>([]);

  useEffect(() => {
    let casesArr: PatientCaseData[] = [];

    for (let i = 1; i <= 4; i++) {
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
        hasDiagnostic: true,
        isPublic: i % 2 === 0,
      });
    }

    casesArr = casesArr.filter((r) => r.isPublic);

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
      <h1>Diagnostics</h1>
      <div className={classes.displayRows}>
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
        <CaseCellsLayout cases={displayedCases} isEditing={false} />
      </div>
    </div>
  );
};

export default Diagnostics;
