import React, { useState } from 'react';

import { PatientCaseData } from '../../common';
import CaseForm from '../../components/cases/CaseForm';

const EditCase = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [patientCase, setPatientCase] = useState<PatientCaseData>({
    caseName: 'Brain',
    caseDescription: 'The patient has headaches',
    patientName: 'Juan',
    patientBirthDate: new Date(),
    patientSex: 'Male',
    PatientWeight: 69,
    imageURL: '',
  });

  return (
    <div>
      <CaseForm
        isEditing={true}
        imageFile={imageFile}
        setImageFile={setImageFile}
        patientCase={patientCase}
        setPatientCase={setPatientCase}
      />
    </div>
  );
};

export default EditCase;
