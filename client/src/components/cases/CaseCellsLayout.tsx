import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

import CaseCell from './CaseCell';
import { PatientCaseData } from '../../common';

const caseCellsLayoutStyles = makeStyles((_: Theme) =>
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

interface CaseCellsLayoutProps {
  cases: PatientCaseData[];
  isEditing: boolean;
}

const CaseCellsLayout = (props: CaseCellsLayoutProps) => {
  const classesCaseCellsLayout = caseCellsLayoutStyles();

  return (
    <div className={classesCaseCellsLayout.cellsDiv}>
      {props.cases.map((caseData, index) => (
        <CaseCell
          key={`case-cell-${index}`}
          patientCaseData={caseData}
          isEditing={props.isEditing}
        />
      ))}
    </div>
  );
};

export default CaseCellsLayout;
