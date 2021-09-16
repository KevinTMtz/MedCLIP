import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router';

import AuthForm from '../../components/auth/AuthForm';
import UserContext from '../../contexts/user';

const Loginpage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const userContext = useContext(UserContext);
  const history = useHistory();

  const Login = async () => {
    try {
      const res = await Axios('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          email,
          password,
        },
      });
      if (res.status === 200) {
        userContext.login(res.data.user, res.data.token);
        history.push('/home');
      } else {
        console.log('Unable to login');
      }
    } catch (error) {
      console.log('Unable to login');
      console.log(error);
    }
  };

  return (
    <div>
      <AuthForm
        title="Login"
        type="login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        authenticate={Login}
      />
    </div>
  );
};

export default Loginpage;
