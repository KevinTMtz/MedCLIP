import React, { useState } from 'react';

import AuthForm from '../../components/auth/AuthForm';

const Loginpage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  return (
    <div>
      <AuthForm
        title="Login"
        type="login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Loginpage;
