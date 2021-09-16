import React from 'react';
import { useHistory } from 'react-router';
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

import { PatientCaseData } from '../../common';

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
}

const CaseCell = (props: CaseCellProps) => {
  const classesCaseCell = caseCellStyles();

  const history = useHistory();

  return (
    <Card className={classesCaseCell.root}>
      <CardActionArea disabled>
        <CardMedia
          className={classesCaseCell.media}
          image='https://prod-images-static.radiopaedia.org/images/25899296/0c8c2658ce6f072ec207823e75f7c7_big_gallery.jpeg'
          title='Medical Imaginery'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {`${props.patientCaseData.caseName} `}
            {props.patientCaseData.hasDiagnostic && (
              <Chip
                variant='outlined'
                size='small'
                color={props.patientCaseData.isPublic ? 'primary' : 'secondary'}
                label={props.patientCaseData.isPublic ? 'Public' : 'Private'}
              />
            )}
          </Typography>

          <Typography variant='body2' color='textSecondary' component='p'>
            {props.patientCaseData.caseDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      {props.patientCaseData.hasDiagnostic ? (
        <CardActions>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() =>
              history.push({
                pathname: '/diagnostic',
                state: props.patientCaseData,
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
                pathname: '/edit-case',
                state: props.patientCaseData,
              })
            }
          >
            Edit case
          </Button>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() =>
              history.push({
                pathname: '/review-diagnostic',
                state: props.patientCaseData,
              })
            }
          >
            Make Diagnostic
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CaseCell;
