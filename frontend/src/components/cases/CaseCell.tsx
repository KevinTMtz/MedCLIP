import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import {
  makeStyles,
  createStyles,
  Theme,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
} from '@material-ui/core';

import { DiagnosticData, PatientCaseData } from '../../common';

const caseCellStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      width: '30%',
      minWidth: '40%',
      maxWidth: 'calc(50% - 8px)',
      flexGrow: 1,
      '@media (max-width: 500px)': {
        minWidth: '100%',
      },
    },
    media: {
      height: 200,
      '@media (max-width: 500px)': {
        height: 160,
      },
    },
  }),
);

interface CaseCellProps {
  patientCaseData: PatientCaseData;
  isEditing: boolean;
}

const CaseCell = (props: CaseCellProps) => {
  const classesCaseCell = caseCellStyles();

  const history = useHistory();

  const [diagnostic, setDiagnostic] = useState<DiagnosticData>();

  useEffect(() => {
    if (props.patientCaseData.diagnosticId) {
      axios(`http://localhost:3001/diagnostics/${props.patientCaseData.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
        responseType: 'json',
      }).then(
        (res) => {
          setDiagnostic(res.data.diagnostic);
        },
        (err) => {
          return;
        },
      );
    }
  }, [props.patientCaseData.diagnosticId, props.patientCaseData.id]);

  return (
    <Card className={classesCaseCell.root}>
      <CardActionArea disabled>
        <CardMedia
          className={classesCaseCell.media}
          image={props.patientCaseData.imageURL}
          title='Medical Imaginery'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {`${props.patientCaseData.caseName} `}
            {props.patientCaseData.diagnosticId && (
              <>
                <Chip
                  variant='outlined'
                  size='small'
                  color={diagnostic?.isPublic ? 'primary' : 'secondary'}
                  label={diagnostic?.isPublic ? 'Public' : 'Private'}
                />{' '}
                {diagnostic?.isAnonymous && (
                  <Chip variant='outlined' size='small' label='Anonymous' />
                )}
              </>
            )}
          </Typography>

          <Typography variant='body2' color='textSecondary' component='p'>
            {props.patientCaseData.caseDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      {props.patientCaseData.diagnosticId ? (
        <CardActions>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() =>
              history.push({
                pathname: props.isEditing
                  ? '/manage-diagnostic'
                  : '/diagnostic',
                state: {
                  patientCaseData: props.patientCaseData,
                  diagnosticData: diagnostic,
                },
              })
            }
          >
            View case &amp; diagnostic
          </Button>
        </CardActions>
      ) : (
        <CardActions>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() =>
              history.push({
                pathname: `/edit-case/${props.patientCaseData.id}`,
              })
            }
          >
            Edit case or make diagnostic
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CaseCell;
