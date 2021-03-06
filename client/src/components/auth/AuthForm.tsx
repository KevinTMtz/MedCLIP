import React from 'react';
import {
  Button,
  makeStyles,
  createStyles,
  TextField,
  Theme,
  Container,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router';

import { styles } from '../../styles';

const formStyles = makeStyles((_: Theme) =>
  createStyles({
    centerForm: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '40%',
      '@media (max-width: 1000px)': {
        width: '60%',
      },
      '@media (max-width: 600px)': {
        width: '80%',
      },
    },
  }),
);

interface AuthFormProps {
  title: string;
  type: 'login' | 'register';
  warning: string | undefined;
  setWarning: React.Dispatch<React.SetStateAction<string | undefined>>;
  name?: string | undefined;
  setName?: React.Dispatch<React.SetStateAction<string | undefined>>;
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
  confirmation?: string | undefined;
  setConfirmation?: React.Dispatch<React.SetStateAction<string | undefined>>;
  authenticate: () => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {
  const classes = styles();
  const formClasses = formStyles();

  const history = useHistory();

  return (
    <Container className={formClasses.centerForm}>
      <header>
        <Typography variant='h4' align='center' style={{ margin: '15px auto' }}>
          {props.title}
        </Typography>
      </header>
      <form className={classes.displayRows}>
        {props.type === 'register' && (
          <TextField
            variant='outlined'
            label='Name:'
            onChange={(event) => {
              if (props.setName) props.setName(event.target.value);
            }}
          />
        )}
        <TextField
          variant='outlined'
          label='E-mail:'
          onChange={(event) => props.setEmail(event.target.value)}
          type='email'
        />
        <TextField
          variant='outlined'
          label='Password:'
          onChange={(event) => props.setPassword(event.target.value)}
          type='password'
        />
        {props.type === 'register' && (
          <TextField
            type='password'
            variant='outlined'
            label='Repeat password:'
            onChange={(event) => {
              if (props.setConfirmation)
                props.setConfirmation(event.target.value);
            }}
          />
        )}
        <div className={classes.displayRowsButtons}>
          {props.type === 'login' ? (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.authenticate()}
              >
                Sign in
              </Button>
              <Button
                variant='contained'
                onClick={() => history.push('/register')}
              >
                Don't have an account? Register
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.authenticate()}
              >
                Register
              </Button>
              <Button
                variant='contained'
                onClick={() => history.push('/login')}
              >
                Already have an account? Sign in
              </Button>
            </>
          )}
          <Button variant='outlined' onClick={() => history.push('/')}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AuthForm;
