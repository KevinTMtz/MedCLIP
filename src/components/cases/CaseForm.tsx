import React from 'react';
import {
  TextField,
  createStyles,
  makeStyles,
  Theme,
  Button,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from 'react-router';

import { styles } from '../../styles';
import { PatientCaseData } from '../../common';
import { mergeObjects } from '../../common/utils';

const caseFormStyles = makeStyles((_: Theme) =>
  createStyles({
    inputImageLabel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      cursor: 'pointer',
      textAlign: 'center',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '4px',
      '&:hover': {
        border: '1px solid black',
      },
    },
    styledInputImage: {
      height: '0px',
      opacity: '0',
      position: 'relative',
      top: '-30px',
    },
    styledInputImagePreview: {
      maxWidth: '50%',
      maxHeight: '300px',
      marginTop: '16px',
      borderRadius: '4px',
      '@media (max-width: 600px)': {
        maxWidth: '90%',
      },
    },
  }),
);

interface CaseFormProps {
  isEditing: boolean;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  patientCase: PatientCaseData;
  setPatientCase: React.Dispatch<React.SetStateAction<PatientCaseData>>;
  createDiagnostic?: () => Promise<void>;
  caseAction: () => Promise<void>;
  deleteCase?: () => Promise<void>;
}

const CaseForm = (props: CaseFormProps) => {
  const classesCaseForm = caseFormStyles();
  const classes = styles();

  const history = useHistory();

  const hangleSetPatientCase = (newValues: any) =>
    props.setPatientCase(mergeObjects(props.patientCase, newValues));

  return (
    <div>
      <h1>{props.isEditing ? 'Edit' : 'Create'} case</h1>
      {/* Add onSubmit validation */}
      <form className={classes.displayRows}>
        <TextField
          variant='outlined'
          label='Case Name'
          required
          value={props.patientCase.caseName}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            hangleSetPatientCase({
              caseName: event.target.value as string,
            })
          }
        />
        <TextField
          label='Case Description'
          multiline
          rows={5}
          variant='outlined'
          required
          value={props.patientCase.caseDescription}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            hangleSetPatientCase({
              caseDescription: event.target.value as string,
            })
          }
        />
        <TextField
          variant='outlined'
          label='Patient Name'
          required
          value={props.patientCase.patientName}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            hangleSetPatientCase({
              patientName: event.target.value as string,
            })
          }
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            id='date-picker-inline'
            label='Patient Date Of Birth'
            format='MM/dd/yyyy'
            value={props.patientCase.patientBirthDate}
            onChange={(date: Date | null) =>
              props.setPatientCase({
                ...props.patientCase,
                patientBirthDate: date,
              })
            }
            required
          />
        </MuiPickersUtilsProvider>
        <FormControl variant='outlined' required>
          <InputLabel htmlFor='outlined-age-native-simple'>
            Patient Sex
          </InputLabel>
          <Select
            native
            label='Patien Sex'
            value={props.patientCase.patientSex}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              props.setPatientCase({
                ...props.patientCase,
                patientSex: event.target.value as string,
              })
            }
          >
            <option value={'Male'}>Male</option>
            <option value={'Female'}>Female</option>
          </Select>
        </FormControl>
        <TextField
          label='Patient Weight (kg)'
          variant='outlined'
          type='number'
          required
          value={props.patientCase.patientWeight}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            hangleSetPatientCase({
              patientWeight: event.target.value as string,
            })
          }
        />
        <label className={classesCaseForm.inputImageLabel}>
          {props.imageFile
            ? `Image file: ${props.imageFile.name}`
            : 'Upload Medical Image'}
          <input
            type='file'
            accept='image/*'
            className={classesCaseForm.styledInputImage}
            required={props.imageFile ? false : true}
            onChange={(event) => {
              const newImageFile = event.target.files
                ? event.target.files[0]
                : props.imageFile;
              props.setImageFile(newImageFile);
              props.setPatientCase({
                ...props.patientCase,
                imageURL: URL.createObjectURL(newImageFile),
              });
            }}
          />
          {props.imageFile && (
            <img
              alt='Could not display'
              src={props.patientCase.imageURL}
              className={classesCaseForm.styledInputImagePreview}
            />
          )}
        </label>

        {/* Actions */}
        <div className={classes.displayRowsButtons}>
          {props.isEditing && (
            <Button
              type='submit'
              value='diagnostic'
              variant='contained'
              color='primary'
              onClick={async () => {
                if (props.createDiagnostic) await props.createDiagnostic();
              }}
            >
              Make diagnostic
            </Button>
          )}

          <Button
            variant='contained'
            color='primary'
            value='saveAndDiagnostic'
            onClick={async () => {
              await props.caseAction();
              history.push({
                pathname: '/home',
                state: { currentTab: 1 },
              });
            }}
          >
            {props.isEditing ? 'Update' : 'Create'} case
          </Button>
          {props.isEditing && (
            <Button
              variant='contained'
              color='secondary'
              onClick={async () => {
                if (props.deleteCase) await props.deleteCase();
                history.push({
                  pathname: '/home',
                  state: { currentTab: 1 },
                });
              }}
            >
              Delete case
            </Button>
          )}
          <Button
            variant='contained'
            onClick={() =>
              history.push({
                pathname: '/home',
                state: { currentTab: 1 },
              })
            }
          >
            Cancel case {props.isEditing ? 'update' : 'creation'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CaseForm;
