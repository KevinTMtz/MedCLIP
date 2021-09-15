import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

//TODO: De-comment after merging Kevin's branch with the style's file
//import { styles } from '../../styles';
/*
const authFormStyles = makeStyles((theme: Theme) => {
  createStyles({
    displayRows: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        marginBottom: theme.spacing(3),
      },
    },
    inputLabel: {
      display: 'flex',
      backgroundColor: 'red',
    },
  });
});*/

interface LoginFormProps {
  title: string;
  type: 'login' | 'register';
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface RegisterFormProps extends LoginFormProps {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  confirmation: string | undefined;
  setConfirmation?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AuthForm: React.FC<LoginFormProps | RegisterFormProps> = (
  props: LoginFormProps | RegisterFormProps
) => {
  //const classesAuthForm = authFormStyles();
  //TODO: De-comment after merging Kevin's branch with the style's file
  //const classes = styles();
  const history = useHistory();
  return (
    <div>
      <header>
        <h1>{props.title}</h1>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          {props.type === 'register' && (
            <TextField variant="outlined" label="Nombre:" />
          )}
          <TextField variant="outlined" label="E-mail:" />
          <TextField variant="outlined" label="Contraseña:" />
          {props.type === 'register' && (
            <TextField variant="outlined" label="Confirmar contraseña:" />
          )}
        </form>
        <div>
          {props.type === 'login' ? (
            <>
              <Button variant="contained" color="primary">
                Iniciar sesión
              </Button>
              <div onClick={() => history.push('/register')}>
                ¿No tienes una cuenta? Regístrate
              </div>
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
              <div onClick={() => history.push('/login')}>
                ¿Ya tienes una cuenta? Inicia sesión
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default AuthForm;
