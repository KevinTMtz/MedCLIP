import React, { useState } from 'react';
import CaseForm from '../../components/cases/CaseForm';

interface PatientCaseData {
  patientBirthDate: Date | null;
  sex: string;
}

const CreateCase = () => {
  const [patientCase, setPatientCase] = useState<PatientCaseData>({
    patientBirthDate: new Date(),
    sex: 'Male',
  });

  const [imageFile, setImageFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();

  return (
    <div>
      <CaseForm
        isEditing={false}
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

export default CreateCase;
