import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/admin/FileUpload';
import DatasetManager from '../components/admin/DatasetManager';
import UserManagement from '../components/admin/UserManagement';
import SubscriptionManagement from '../components/admin/SubscriptionManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('datasets');

  const handleUploadSuccess = () => {
    // Refresh will be handled by DatasetManager's useEffect
    window.location.reload();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <strong>DATUM</strong>
          <span className="admin-badge">Admin</span>
        </div>
        <nav className="admin-nav">
          <button
            className={activeTab === 'datasets' ? 'active' : ''}
            onClick={() => setActiveTab('datasets')}
          >
            Datasets
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={activeTab === 'subscriptions' ? 'active' : ''}
            onClick={() => setActiveTab('subscriptions')}
          >
            Subscriptions
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={() => navigate('/dashboard')} className="back-button">
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>
              {activeTab === 'datasets' && 'Manage datasets and files'}
              {activeTab === 'users' && 'Create and manage users'}
              {activeTab === 'subscriptions' && 'View and manage subscription requests'}
            </p>
          </div>
        </header>

        <main className="admin-content">
          {activeTab === 'datasets' && (
            <div className="admin-tab-content">
              <FileUpload onUploadSuccess={handleUploadSuccess} />
              <DatasetManager />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="admin-tab-content">
              <UserManagement />
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="admin-tab-content">
              <SubscriptionManagement />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

