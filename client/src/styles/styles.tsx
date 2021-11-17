import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    layoutDiv: {
      maxWidth: '1500px',
      margin: '0px auto 16px auto',
      padding: '0 24px',
      '@media (max-width: 500px)': {
        padding: '0 16px',
      },
    },
    displayRows: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    displayRowsButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
  }),
);
