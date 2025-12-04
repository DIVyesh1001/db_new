import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import LoggedOutHomepage from './pages/LoggedOutHomepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MarketDetail from './pages/MarketDetail';
import MacroeconomicsDetails from './pages/MacroeconomicsDetails';
import DatasetDetail from './pages/DatasetDetail';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/markets/:marketName"
                element={
                  <ProtectedRoute>
                    <MarketDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/macroeconomics"
                element={
                  <ProtectedRoute>
                    <MacroeconomicsDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dataset/:id"
                element={
                  <ProtectedRoute>
                    <DatasetDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="/markets" element={<Navigate to="/dashboard" replace />} />
              <Route path="/companies" element={<Navigate to="/dashboard" replace />} />
              <Route path="/reports" element={<Navigate to="/dashboard" replace />} />
              <Route path="/pricing" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

