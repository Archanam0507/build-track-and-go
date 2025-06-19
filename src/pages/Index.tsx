
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();

  // Redirect to dashboard if logged in, otherwise to login
  return <Navigate to={user ? "/" : "/login"} replace />;
};

export default Index;
