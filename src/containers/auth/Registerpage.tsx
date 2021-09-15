import React, { useState } from 'react';

import AuthForm from '../../components/auth/AuthForm';

const Registerpage: React.FC = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  return (
    <div>
      <AuthForm
        title="Login"
        type="register"
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Registerpage;
