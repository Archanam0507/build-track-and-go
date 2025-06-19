
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DailyUpdates from './pages/DailyUpdates';
import Blueprints from './pages/Blueprints';
import Materials from './pages/Materials';
import Payments from './pages/Payments';
import PaintPicker from './pages/PaintPicker';
import ProgressTracker from './pages/ProgressTracker';
import Contacts from './pages/Contacts';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/daily-updates" 
        element={
          <ProtectedRoute>
            <DailyUpdates />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/blueprints" 
        element={
          <ProtectedRoute>
            <Blueprints />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/materials" 
        element={
          <ProtectedRoute>
            <Materials />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payments" 
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/paint-picker" 
        element={
          <ProtectedRoute>
            <PaintPicker />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/progress-tracker" 
        element={
          <ProtectedRoute>
            <ProgressTracker />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/contacts" 
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
