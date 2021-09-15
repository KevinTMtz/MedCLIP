import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from '@material-ui/core';

import Diagnostic from '../../components/diagnostics/Diagnostic';
import { styles } from '../../styles';

interface LocationProps {
  imageURL: string | undefined;
  patientName: string;
  patientBirthDate: Date;
  patientSex: string;
  PatientWeight: string;
}

const ReviewDiagnostic = () => {
  const classes = styles();

  const history = useHistory();
  const locationState = useLocation().state as LocationProps;

  const [diagnostic] = useState('Tumor');

  return (
    <div>
      <Diagnostic
        imageURL={locationState.imageURL}
        patientName={locationState.patientName}
        patientBirthDate={locationState.patientBirthDate}
        patientSex={locationState.patientSex}
        PatientWeight={locationState.PatientWeight}
        diagnostic={diagnostic}
      />

      <div className={classes.displayRowsButtons}>
        <Button variant='contained' color='primary'>
          Confirm diagnostic
        </Button>
        <Button
          variant='contained'
          onClick={() => history.push('/create-case')}
        >
          Return to edit case
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => history.push('/edit-case')}
        >
          Dismiss diagnostic
        </Button>
      </div>
    </div>
  );
};

export default ReviewDiagnostic;
