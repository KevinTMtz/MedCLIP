import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

import { styles } from '../../styles';

const diagnosticStyles = makeStyles((_: Theme) =>
  createStyles({
    image: {
      maxWidth: '50%',
      maxHeight: '300px',
      margin: '0 auto 24px auto',
      '@media (max-width: 600px)': {
        maxWidth: '90%',
      },
    },
  }),
);

interface DiagnosticProps {
  imageURL: string | undefined;
  patientName: string;
  patientBirthDate: Date;
  patientSex: string;
  PatientWeight: string;
  diagnostic: string;
}

const Diagnostic = (props: DiagnosticProps) => {
  const classesDiagnostic = diagnosticStyles();
  const classes = styles();

  return (
    <div className={classes.displayRows}>
      <h1>Case Diagnostic</h1>
      <p>Patient Name: {props.patientName}</p>
      <p>Patient Birth Date: {props.patientBirthDate.toLocaleString()}</p>
      <p>Patient Sex: {props.patientSex}</p>
      <p>Patient Weight: {props.PatientWeight}kg</p>
      <img
        alt='Could not display'
        src={props.imageURL}
        className={classesDiagnostic.image}
      />
      <p>Diagnostic: {props.diagnostic}</p>
    </div>
  );
};

export default Diagnostic;
