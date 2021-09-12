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

import { styles } from '../../styles';

const caseFormStyles = makeStyles((_: Theme) =>
  createStyles({
    inputImageLabel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 16px',
      cursor: 'pointer',
      textAlign: 'center',
      width: 'calc(100% - 34px)',
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
  }),
);

interface PatientCaseData {
  patientBirthDate: Date | null;
  sex: string;
}

interface CaseFormProps {
  title: string;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  imageURL: string | undefined;
  setImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
  patientCase: PatientCaseData;
  setPatientCase: React.Dispatch<React.SetStateAction<PatientCaseData>>;
}

const CaseForm = (props: CaseFormProps) => {
  const classesCaseForm = caseFormStyles();
  const classes = styles();

  return (
    <div>
      <header>
        <h1>{props.title}</h1>
      </header>
      <form className={classes.displayRows}>
        <TextField variant='outlined' label='Case Name' />
        <TextField
          label='Case Description'
          multiline
          rows={5}
          variant='outlined'
        />
        <TextField variant='outlined' label='Patient Name' />
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
          />
        </MuiPickersUtilsProvider>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='outlined-age-native-simple'>
            Patient Sex
          </InputLabel>
          <Select
            native
            value={props.patientCase.sex}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              props.setPatientCase({
                ...props.patientCase,
                sex: event.target.value as string,
              })
            }
            label='Patien Sex'
          >
            <option value={'Male'}>Male</option>
            <option value={'Female'}>Female</option>
          </Select>
        </FormControl>
        <label className={classesCaseForm.inputImageLabel}>
          {props.imageFile
            ? `Image file: ${props.imageFile.name}`
            : 'Upload Image'}
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
              props.setImageURL(URL.createObjectURL(newImageFile));
            }}
          />
          {props.imageFile && (
            <img
              alt='Could not display'
              src={props.imageURL}
              className={classes.styledInputImagePreview}
            ></img>
          )}
        </label>

        <div className={classes.displayRowsButtons}>
          <Button variant='contained' color='primary'>
            Make diagnostic
          </Button>
          <Button variant='contained' color='secondary'>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CaseForm;
