import axios from 'axios';
import React, { useContext, useState } from 'react';

import AuthForm from '../../components/auth/AuthForm';
import AuthSnackbar from '../../components/auth/AuthSnackbar';
import Spinner from '../../components/auth/Spinner';
import UserContext from '../../contexts/user';

const Registerpage: React.FC = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmation, setConfirmation] = useState<string>();
  const [warning, setWarning] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const userContext = useContext(UserContext);

  const Register = async () => {
    if (name === undefined) {
      setWarning('Please enter your full name');
      handleClick();
      return;
    }
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
    if (password !== confirmation) {
      setWarning('The passwords do not match');
      handleClick();
      return;
    }
    setIsAuth(true);
    //TODO: change all req paths to a variable
    await axios('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email,
        password,
        name,
      },
      responseType: 'json',
      withCredentials: true,
    }).then(
      (res) => {
        userContext.login();
        setWarning(undefined);
      },
      (err) => {
        setIsAuth(false);
        handleClick();
        setWarning(err.response.data.message);
        setName(undefined);
        setEmail(undefined);
        setPassword(undefined);
        return;
      },
    );
  };

  return (
    <div>
      {isAuth ? (
        <Spinner />
      ) : (
        <div>
          <AuthForm
            title='Registro'
            type='register'
            warning={warning}
            setWarning={setWarning}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            authenticate={Register}
          />
          <AuthSnackbar warning={warning} open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default Registerpage;
