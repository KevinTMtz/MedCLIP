import React, { useState } from 'react';

import { PatientCaseData } from '../../common';
import CaseForm from '../../components/cases/CaseForm';

const CreateCase = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [patientCase, setPatientCase] = useState<PatientCaseData>({
    caseName: '',
    caseDescription: '',
    patientName: '',
    patientBirthDate: new Date(),
    patientSex: 'Male',
    PatientWeight: 0,
    imageURL: '',
    hasDiagnostic: false,
    isPublic: false,
  });

  return (
    <div>
      <CaseForm
        isEditing={false}
        imageFile={imageFile}
        setImageFile={setImageFile}
        patientCase={patientCase}
        setPatientCase={setPatientCase}
      />
    </div>
  );
};

export default CreateCase;
