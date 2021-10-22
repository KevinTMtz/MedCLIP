import React, { useState } from 'react';
import axios from 'axios';

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
    patientWeight: 0,
    imageURL: '',
    hasDiagnostic: false,
    isPublic: false,
  });

  const createCase = async () => {
    await axios('http://localhost:3001/cases/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        ...patientCase,
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      (res) => {
        console.log('Created case');
      },
      (err) => {
        return;
      },
    );
  };

  return (
    <div>
      <CaseForm
        isEditing={false}
        imageFile={imageFile}
        setImageFile={setImageFile}
        patientCase={patientCase}
        setPatientCase={setPatientCase}
        caseAndDiagnosticAction={async () => {}}
        caseAction={createCase}
      />
    </div>
  );
};

export default CreateCase;
