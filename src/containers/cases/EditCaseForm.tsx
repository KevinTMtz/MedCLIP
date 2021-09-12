import React, { useState } from 'react';

import CaseForm from '../../components/cases/CaseForm';

interface PatientCaseData {
  patientBirthDate: Date | null;
  sex: string;
}

const EditCaseForm = () => {
  const [patientCase, setPatientCase] = useState<PatientCaseData>({
    patientBirthDate: new Date(),
    sex: '',
  });

  const [imageFile, setImageFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();

  return (
    <div>
      <CaseForm
        title='Edit diagnostic'
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageURL={imageURL}
        setImageURL={setImageURL}
        patientCase={patientCase}
        setPatientCase={setPatientCase}
      />
    </div>
  );
};

export default EditCaseForm;
