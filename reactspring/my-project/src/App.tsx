import './App.css'
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Dashboard from "./components/Dashboard.tsx";

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  if (isAuthenticated) {
    return <Dashboard />;
  }


  return isRegistering ? (
      <Register onToggleToLogin={() => setIsRegistering(false)} />
  ) : (
      <Login onToggleToRegister={() => setIsRegistering(true)} />
  );
};

const App: React.FC = () => {
  return (
      <AuthProvider>
        <MainApp />
      </AuthProvider>
  );
};

export default App;
