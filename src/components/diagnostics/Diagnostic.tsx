import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

import { DiagnosticData, PatientCaseData } from '../../common';
import Divider from '../ui/Divider';

const diagnosticStyles = makeStyles((_: Theme) =>
  createStyles({
    image: {
      maxWidth: '50%',
      maxHeight: '300px',
      margin: '0 auto',
      borderRadius: '4px',
      '@media (max-width: 600px)': {
        maxWidth: '90%',
      },
    },
    rows: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '20px',
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

  return (
    <div>
      <h1>Case</h1>
      <div className={classesDiagnostic.rows}>
        <p>
          <strong>Name:</strong> {patientCaseData.caseName}
        </p>
        <p>
          <strong>Description:</strong> {patientCaseData.caseDescription}
        </p>
      </div>

      <Divider />

      <h3>Patient Information</h3>
      <div className={classesDiagnostic.rows}>
        {diagnosticData.isAnonymous ? (
          <p>
            Patient information is not displayed because the case is anonymous
          </p>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {patientCaseData.patientName}
            </p>
            <p>
              <strong>Birth Date:</strong>{' '}
              {patientCaseData.patientBirthDate?.toLocaleString()}
            </p>
            <p>
              <strong>Sex:</strong> {patientCaseData.patientSex}
            </p>
            <p>
              <strong>Weight:</strong> {patientCaseData.patientWeight}kg
            </p>
          </>
        )}
      </div>

      <Divider />

      <h3>Medical Image</h3>
      <div className={classesDiagnostic.rows}>
        <img
          alt='Could not display'
          src={patientCaseData.imageURL}
          className={classesDiagnostic.image}
        />
      </div>

      <Divider />

      <h2>Diagnostic</h2>
      <p>{diagnosticData.diagnosis}</p>
      <br />
    </div>
  );
};

export default Diagnostic;
