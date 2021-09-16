import React, { useEffect, useState } from 'react';

import { PatientCaseData } from '../../common';
import { mergeObjects } from '../../common/utils';
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

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const file = xhr.response;
      file.name = 'image';
      file.lastModified = new Date();
      setImageFile(file);
      setPatientCase((p) =>
        mergeObjects(p, { imageURL: URL.createObjectURL(file) }),
      );
    };
    xhr.open(
      'GET',
      'https://prod-images-static.radiopaedia.org/images/25899296/0c8c2658ce6f072ec207823e75f7c7_big_gallery.jpeg',
    );
    xhr.send();
  }, []);

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
