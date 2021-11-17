import React from 'react';
import {
  createStyles,
  IconButton,
  makeStyles,
  Snackbar,
  SnackbarContent,
  Theme,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const authSnackbarStyles = makeStyles((_: Theme) =>
  createStyles({
    loginWarning: {
      backgroundColor: 'white',
      color: 'red',
      border: '1px solid red',
      textAlign: 'center',
    },
  }),
);

interface AuthSnackbarProps {
  warning: string | undefined;
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthSnackbar: React.FC<AuthSnackbarProps> = (
  props: AuthSnackbarProps,
) => {
  const authSnackbarClasses = authSnackbarStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={props.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <SnackbarContent
        message={props.warning}
        className={authSnackbarClasses.loginWarning}
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <Close fontSize='small' />
            </IconButton>
          </>
        }
      />
    </Snackbar>
  );
};

export default AuthSnackbar;
