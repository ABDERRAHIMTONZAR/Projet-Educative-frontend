import React from 'react';
import LoginForm from './Login/LoginForm';
import Illustration from './Login/Illustration';

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-50 to-gray-100 items-center justify-center p-8">
          <Illustration />
        </div>
        
        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;