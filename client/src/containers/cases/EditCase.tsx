import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { PatientCaseData } from '../../common';
import { mergeObjects } from '../../common/utils';
import CaseForm from '../../components/cases/CaseForm';
import Spinner from '../../components/auth/Spinner';

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

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios(`/api/cases/${caseId}`, {
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

  const createDiagnostic = async () => {
    setLoading(true);
    await axios(`/api/diagnostics/${patientCase?.id}/get-diagnosis`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      async (res) => {
        await axios(`/api/diagnostics/${patientCase?.id}/save-diagnostic`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          data: {
            diagnosis: res.data.diagnosis,
            isPublic: false,
            isAnonym: false,
          },
          withCredentials: true,
          responseType: 'json',
        }).then(
          (res) => {
            console.log('Created diagnostic');
            setLoading(false);
          },
          (err) => {
            setLoading(false);
            return;
          },
        );
      },
      (err) => {
        setLoading(false);
        return;
      },
    );
  };

  const updateCase = async () => {
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
        await axios(`/api/cases/${patientCase.id}/update`, {
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
            console.log('Updated case');
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

  const deleteCase = async () => {
    await axios(`/api/cases/${patientCase.id}/delete`, {
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
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

export default EditCase;
