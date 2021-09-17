import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

import { styles } from '../../styles';

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

  const history = useHistory();

  return (
    <div>
      <header>
        <h1>{props.title}</h1>
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
    </div>
  );
};

export default AuthForm;
