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
  hasDiagnostic: boolean;
}

const CaseCell = (props: CaseCellProps) => {
  const classesCaseCell = caseCellStyles();

  const history = useHistory();

  const staticState = {
    caseName: 'Brain',
    caseDescription:
      'Left temporal lobe ring enhancing lesion with associated vasogenic edema.',
    patientName: 'Juan',
    patientBirthDate: new Date(),
    patientSex: 'Male',
    PatientWeight: 69,
    imageURL:
      'https://prod-images-static.radiopaedia.org/images/25899296/0c8c2658ce6f072ec207823e75f7c7_big_gallery.jpeg',
  };

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
            Brain{' '}
            {props.hasDiagnostic && (
              <Chip
                variant='outlined'
                size='small'
                color='secondary'
                label='Private'
              />
            )}
          </Typography>

          <Typography variant='body2' color='textSecondary' component='p'>
            Left temporal lobe ring enhancing lesion with associated vasogenic
            edema.
          </Typography>
        </CardContent>
      </CardActionArea>
      {props.hasDiagnostic ? (
        <CardActions>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() =>
              history.push({
                pathname: '/diagnostic',
                state: staticState,
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
            onClick={() => history.push('/edit-case')}
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
                state: staticState,
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
