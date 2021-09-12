import React from 'react';

import { styles } from '../../styles';

interface CaseDiagnosticProps {
  imageURL: string | undefined;
}

const CaseDiagnostic = (props: CaseDiagnosticProps) => {
  const classes = styles();

  return (
    <div>
      <header>
        <h1>Case Diagnostic</h1>
        <img
          alt='Could not display'
          src={props.imageURL}
          className={classes.styledInputImagePreview}
        ></img>
      </header>
    </div>
  );
};

export default CaseDiagnostic;
