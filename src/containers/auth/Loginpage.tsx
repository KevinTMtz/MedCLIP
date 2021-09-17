import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  createStyles,
  CircularProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';

import AuthForm from '../../components/auth/AuthForm';
import UserContext from '../../contexts/user';
import AuthSnackbar from '../../components/auth/AuthSnackbar';

const LoginpageStyles = makeStyles((_: Theme) =>
  createStyles({
    centerSpinner: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
);

const Loginpage: React.FC = () => {
  const loginpageClasses = LoginpageStyles();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [warning, setWarning] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const userContext = useContext(UserContext);

  const Login = async () => {
    if (email === undefined) {
      setWarning('Please enter your email');
      handleClick();
      return;
    }
    if (password === undefined || password?.length < 5) {
      setWarning('Please enter a valid password');
      handleClick();
      return;
    }
    setIsAuth(true);
    await axios('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email,
        password,
      },
      responseType: 'json',
    }).then(
      (res) => {
        userContext.login(res.data.user, res.data.token);
        setWarning(undefined);
      },
      (err) => {
        setIsAuth(false);
        handleClick();
        setWarning(err.response.data.message);
        setEmail(undefined);
        setPassword(undefined);
        return;
      },
    );
  };

  return (
    <div>
      {isAuth ? (
        <div className={loginpageClasses.centerSpinner}>
          <CircularProgress size='80px' color='primary' />
        </div>
      ) : (
        <>
          <AuthForm
            title='Login'
            type='login'
            warning={warning}
            setWarning={setWarning}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            authenticate={Login}
          />
          <AuthSnackbar warning={warning} setOpen={setOpen} open={open} />
        </>
      )}
    </div>
  );
};

export default Loginpage;
