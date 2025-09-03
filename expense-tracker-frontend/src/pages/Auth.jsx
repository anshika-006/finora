import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import ThemeToggle from '../components/common/ThemeToggle';
import { ShieldCheck } from 'lucide-react';

const AuthPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = (userData) => {
    // In a real app, you would call the register endpoint and then the login endpoint.
    // For now, we'll just log the user in with their new credentials.
    onLogin(userData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-10 h-10 text-primary-light" />
        <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Finora</h1>
      </div>

      {isRegistering ? (
        <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setIsRegistering(false)} />
      ) : (
        <LoginForm onLogin={onLogin} onSwitchToRegister={() => setIsRegistering(true)} />
      )}
    </div>
  );
};

export default AuthPage;

