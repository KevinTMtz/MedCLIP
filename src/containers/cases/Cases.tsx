import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles, createStyles, Theme, Button } from '@material-ui/core';

import { styles } from '../../styles';
import CaseCell from '../../components/cases/CaseCell';
import { PatientCaseData } from '../../common';

const casesStyles = makeStyles((_: Theme) =>
  createStyles({
    cellsDiv: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '24px',
    },
  }),
);

const Cases = () => {
  const classesCases = casesStyles();
  const classes = styles();

  const history = useHistory();

  const [cases, setCases] = useState<PatientCaseData[]>([]);

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
      });
    }

    setCases(casesArr);
  }, []);

  return (
    <div>
      <h1>My Cases</h1>
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
      <div className={classesCases.cellsDiv}>
        {cases.map((caseData, index) => (
          <CaseCell
            hasDiagnostic={index % 2 === 0}
            patientCaseData={caseData}
          />
        ))}
      </div>
    </div>
  );
};

export default Cases;
