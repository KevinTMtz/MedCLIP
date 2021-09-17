import React, { useState } from 'react';

import AuthForm from '../../components/auth/AuthForm';

const Registerpage: React.FC = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [warning, setWarning] = useState<string>();
  return (
    <div>
      <AuthForm
        title='Registro'
        type='register'
        name={name}
        warning={warning}
        setWarning={setWarning}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        authenticate={async () => {
          console.log('Register');
        }}
      />
    </div>
  );
};

export default Registerpage;
