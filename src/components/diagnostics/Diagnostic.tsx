import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

import { DiagnosticData, PatientCaseData } from '../../common';
import { styles } from '../../styles';

const diagnosticStyles = makeStyles((_: Theme) =>
  createStyles({
    image: {
      maxWidth: '50%',
      maxHeight: '300px',
      margin: '0 auto 24px auto',
      borderRadius: '4px',
      '@media (max-width: 600px)': {
        maxWidth: '90%',
      },
    },
  }),
);

interface DiagnosticProps {
  patientCaseData: PatientCaseData;
  diagnosticData: DiagnosticData;
}

const Diagnostic: React.FC<DiagnosticProps> = ({
  patientCaseData,
  diagnosticData,
}) => {
  const classesDiagnostic = diagnosticStyles();
  const classes = styles();

  return (
    <div className={classes.displayRows}>
      <h1>Case</h1>
      <p>Case Name: {patientCaseData.caseName}</p>
      <p>Case Description: {patientCaseData.caseDescription}</p>
      <p>Patient Name: {patientCaseData.patientName}</p>
      <p>
        Patient Birth Date: {patientCaseData.patientBirthDate?.toLocaleString()}
      </p>
      <p>Patient Sex: {patientCaseData.patientSex}</p>
      <p>Patient Weight: {patientCaseData.patientWeight}kg</p>
      <p>Medical Image:</p>
      <img
        alt='Could not display'
        src={patientCaseData.imageURL}
        className={classesDiagnostic.image}
      />
      {diagnosticData && (
        <>
          <h1>Analysis result</h1>
          <p>Diagnostic: {diagnosticData.diagnosis}</p>
        </>
      )}
    </div>
  );
};

export default Diagnostic;
