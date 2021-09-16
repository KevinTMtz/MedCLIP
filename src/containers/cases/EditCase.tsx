import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { PatientCaseData } from '../../common';
import { mergeObjects } from '../../common/utils';
import CaseForm from '../../components/cases/CaseForm';

const EditCase = () => {
  const locationState = useLocation().state as PatientCaseData;

  const [imageFile, setImageFile] = useState<File>();
  const [patientCase, setPatientCase] =
    useState<PatientCaseData>(locationState);

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
