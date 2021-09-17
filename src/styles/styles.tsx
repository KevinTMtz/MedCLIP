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
  })
);
