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
  });

  const createCase = async () => {
    var data = new FormData();
    data.append('file', imageFile as Blob);
    data.append('cloud_name', 'dtvygtfio');
    data.append('upload_preset', 'dvibozng');

    await axios('https://api.cloudinary.com/v1_1/dtvygtfio/image/upload', {
      method: 'POST',
      data: data,
      responseType: 'json',
    }).then(
      async (res) => {
        await axios('/api/cases/create', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          data: {
            ...patientCase,
            imageURL: res.data.url,
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
        caseAction={createCase}
      />
    </div>
  );
};

export default CreateCase;
