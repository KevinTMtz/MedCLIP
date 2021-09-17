import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

import { styles } from '../../styles';
import { PatientCaseData } from '../../common';
import CaseCellsLayout from '../../components/cases/CaseCellsLayout';

const Cases = () => {
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
        hasDiagnostic: i % 2 === 0,
        isPublic: i % 2 === 0,
      });
    }

    setCases(casesArr);
  }, []);

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
        <CaseCellsLayout cases={cases} isEditing={true} />
      </div>
    </div>
  );
};

export default Cases;
