import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

import { styles } from '../../styles';

interface LoginFormProps {
  title: string;
  type: 'login' | 'register';
  warning: string | undefined;
  setWarning: React.Dispatch<React.SetStateAction<string | undefined>>;
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
  authenticate: () => Promise<void>;
}

interface RegisterFormProps extends LoginFormProps {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  confirmation: string | undefined;
  setConfirmation: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AuthForm: React.FC<LoginFormProps | RegisterFormProps> = (
  props: LoginFormProps | RegisterFormProps
) => {
  const classes = styles();

  const history = useHistory();

  return (
    <div>
      <header>
        <h1>{props.title}</h1>
        <form className={classes.displayRows}>
          {props.type === 'register' && (
            <TextField variant="outlined" label="Name:" />
          )}
          <TextField
            variant="outlined"
            label="E-mail:"
            onChange={(event) => props.setEmail(event.target.value)}
            type="email"
          />
          <TextField
            variant="outlined"
            label="Password:"
            onChange={(event) => props.setPassword(event.target.value)}
            type="password"
          />
          {props.type === 'register' && (
            <TextField
              type="password"
              variant="outlined"
              label="Repeat password:"
            />
          )}
        </form>
        <div className={classes.displayRowsButtons}>
          {props.type === 'login' ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  props.authenticate();
                }}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push('/register')}
              >
                Don't have an account? Register
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/homepage')}
              >
                Register
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push('/login')}
              >
                Already have an account? Sign in
              </Button>
            </>
          )}
          <Button variant="outlined" onClick={() => history.push('/')}>
            Cancel
          </Button>
        </div>
      </header>
    </div>
  );
};

export default AuthForm;
