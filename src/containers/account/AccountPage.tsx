import React, { useState } from 'react';

import AccountForm from '../../components/account/AccountForm';
import AuthSnackbar from '../../components/auth/AuthSnackbar';

const AccountPage: React.FC = () => {
  const [name, setName] = useState<string>('Sebas');
  const [email, setEmail] = useState<string>('sebas@gmail.com');
  const [password, setPassword] = useState<string>('12345');
  const [confirmation, setConfirmation] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(true);

  const [warning, setWarning] = useState<string>();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      <h1>My Account</h1>
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
      />
      <AuthSnackbar warning={warning} setOpen={setOpen} open={open} />
    </div>
  );
};

export default AccountPage;
