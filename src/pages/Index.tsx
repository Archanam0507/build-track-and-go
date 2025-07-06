
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const { user, userProfile } = useAuth();

  // Redirect to dashboard if logged in, otherwise to login
  return <Navigate to={user && userProfile ? "/" : "/login"} replace />;
};

export default Index;
