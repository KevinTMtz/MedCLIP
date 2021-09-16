import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    rootDiv: {
      maxWidth: '1500px',
      margin: '0px auto',
      padding: '0 24px',
      '@media (max-width: 500px)': {
        padding: '0 16px',
      },
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
  }),
);
