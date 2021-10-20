import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import AccountForm from '../../components/account/AccountForm';
import AuthSnackbar from '../../components/auth/AuthSnackbar';
import UserContext from '../../contexts/user';
import Spinner from '../../components/auth/Spinner';

const AccountPage: React.FC = () => {
  const userContext = useContext(UserContext);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const [warning, setWarning] = useState<string>('');
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    const GetInfo = async () => {
      setLoading(true);
      //TODO: change all req paths to a variable
      await axios('http://localhost:3001/manage-users/get-my-info', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        responseType: 'json',
        withCredentials: true,
      }).then(
        (res) => {
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(true);
        },
      );
    };

    GetInfo();
    // eslint-disable-next-line
  }, []);

  const UpdateUser = async () => {
    if (name === undefined) {
      setWarning('Please enter your full name');
      handleClick();
      return;
    }
    if (email === undefined) {
      setWarning('Please enter a valid email');
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
    setLoading(true);
    //TODO: change all req paths to a variable
    await axios('http://localhost:3001/manage-users/update-my-user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
      responseType: 'json',
      withCredentials: true,
    }).then(
      (res) => {
        setDisabled(true);
        setLoading(false);
      },
      (err) => {
        setWarning(err.response.data.message);
        handleClick();
        setLoading(false);
      },
    );
  };

  const DeleteUser = async () => {
    setLoading(true);
    //TODO: change all req paths to a variable
    await axios('http://localhost:3001/manage-users/delete-my-user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      responseType: 'json',
      withCredentials: true,
    }).then(
      (res) => {
        console.log(res);
        setLoading(false);
        userContext.logout();
      },
      (err) => {
        setWarning(err.response.data.message);
        handleClick();
      },
    );
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <AccountForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            disabled={disabled}
            setDisabled={setDisabled}
            delete={DeleteUser}
            update={UpdateUser}
          />
          <AuthSnackbar warning={warning} setOpen={setOpen} open={open} />
        </>
      )}
    </div>
  );
};

export default AccountPage;
