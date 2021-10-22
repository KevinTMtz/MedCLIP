import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';

import { PatientCaseData } from '../../common';
import { mergeObjects } from '../../common/utils';
import CaseForm from '../../components/cases/CaseForm';

const EditCase = () => {
  const history = useHistory();

  const locationState = useLocation().state as PatientCaseData;

  const [imageFile, setImageFile] = useState<File>();
  const [patientCase, setPatientCase] =
    useState<PatientCaseData>(locationState);

  console.log(patientCase);

  useEffect(() => {
    if (patientCase.imageURL) {
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
      xhr.open('GET', patientCase.imageURL);
      xhr.send();
    }
  }, []);

  const createDiagnostic = async () => {
    await axios(
      `http://localhost:3001/diagnostics/${patientCase.id}/save-diagnostic`,
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
      async (res) => {
        await axios(`http://localhost:3001/diagnostics/${patientCase.id}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
          withCredentials: true,
          responseType: 'json',
        }).then(
          (res) => {
            history.push({
              pathname: '/review-diagnostic',
              state: {
                patientCaseData: patientCase,
                diagnosticData: res.data.diagnostic_data,
              },
            });
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
