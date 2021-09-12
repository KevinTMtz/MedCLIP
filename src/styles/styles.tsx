import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    rootDiv: {
      margin: '0px 30px',
    },
    displayRows: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        marginBottom: theme.spacing(3),
      },
    },
    displayRowsButtons: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        marginBottom: theme.spacing(2),
      },
    },

    // Case form & diagnostic
    styledInputImagePreview: {
      maxWidth: '50%',
      maxHeight: '300px',
      marginTop: '16px',
      '@media (max-width: 600px)': {
        maxWidth: '90%',
      },
    },
  }),
);
