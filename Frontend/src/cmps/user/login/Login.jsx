import React from 'react';
import { LoginForm } from './LoginForm';
import { Link } from 'react-router-dom';

export const Login = ({ login }) => {
  return (
    <div className='login'>
      <h3>Log In</h3>
      <LoginForm login={login} />
      <Link to='/account/signup'>Create account</Link>
    </div>
  );
}

