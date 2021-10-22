import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { PatientCaseData } from '../../common';
import { mergeObjects } from '../../common/utils';
import CaseForm from '../../components/cases/CaseForm';

interface CaseParams {
  caseId: string;
}

const EditCase = () => {
  const { caseId } = useParams<CaseParams>();

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

  useEffect(() => {
    axios(`http://localhost:3001/cases/${caseId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      (res) => {
        setPatientCase(res.data);

        if (res.data.imageURL) {
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
          xhr.open('GET', res.data.imageURL);
          xhr.send();
        }
      },
      (err) => {
        return;
      },
    );
  }, [caseId]);

  const createDiagnostic = () => {
    axios(
      `http://localhost:3001/diagnostics/${patientCase?.id}/save-diagnostic`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          diagnosis: 'Vein of Galen Malformation',
          isPublic: false,
          isAnonym: false,
        },
        withCredentials: true,
        responseType: 'json',
      },
    ).then(
      (res) => {
        console.log('Created diagnostic');
      },
      (err) => {
        return;
      },
    );
  };

  const updateCase = async () => {
    await axios(`http://localhost:3001/cases/${patientCase.id}/update`, {
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
        console.log('Updated case');
      },
      (err) => {
        return;
      },
    );
  };

  const deleteCase = async () => {
    await axios(`http://localhost:3001/cases/${patientCase.id}/delete`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      (res) => {
        console.log('Deleted case');
      },
      (err) => {
        return;
      },
    );
  };

  return (
    <div>
      <CaseForm
        isEditing={true}
        imageFile={imageFile}
        setImageFile={setImageFile}
        patientCase={patientCase}
        setPatientCase={setPatientCase}
        createDiagnostic={createDiagnostic}
        caseAction={updateCase}
        deleteCase={deleteCase}
      />
    </div>
  );
};

export default EditCase;
