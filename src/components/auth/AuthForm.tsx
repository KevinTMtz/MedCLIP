import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

import { styles } from '../../styles';

interface LoginFormProps {
  title: string;
  type: 'login' | 'register';
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
            <TextField variant="outlined" label="Nombre:" />
          )}
          <TextField
            variant="outlined"
            label="E-mail:"
            onChange={(event) => props.setEmail(event.target.value)}
            type="email"
          />
          <TextField
            variant="outlined"
            label="Contraseña:"
            onChange={(event) => props.setPassword(event.target.value)}
            type="password"
          />
          {props.type === 'register' && (
            <TextField
              type="password"
              variant="outlined"
              label="Confirmar contraseña:"
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
                Iniciar sesión
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push('/register')}
              >
                ¿No tienes una cuenta? Regístrate
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/homepage')}
              >
                Registrarse
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push('/login')}
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Button>
            </>
          )}
          <Button variant="outlined" onClick={() => history.push('/')}>
            Cancelar
          </Button>
        </div>
      </header>
    </div>
  );
};

export default AuthForm;
