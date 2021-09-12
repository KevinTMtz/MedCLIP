import React, { useState } from 'react';
import CaseDiagnostic from '../../components/cases/CaseDiagnostic';
import CaseForm from '../../components/cases/CaseForm';

interface PatientCaseData {
  patientBirthDate: Date | null;
  sex: string;
}

const CreateCaseForm = () => {
  const [patientCase, setPatientCase] = useState<PatientCaseData>({
    patientBirthDate: new Date(),
    sex: 'Male',
  });

  const [imageFile, setImageFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();

  return (
    <div>
      <CaseForm
        title='Create diagnostic'
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

export default CreateCaseForm;
