import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/dashboard');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/dashboard" className="logo">
          <strong>DATUM</strong>
        </Link>
        <nav className="nav">
          {user ? (
            <>
              <Link to="/dashboard">Products</Link>
              <Link to="/markets">Markets</Link>
              <Link to="/dashboard">Dashboards</Link>
              <Link to="/companies">Companies</Link>
              <Link to="/reports">Reports</Link>
              {user.role === 'admin' && (
                <Link to="/admin">Management</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/markets">Markets</Link>
              <Link to="/dashboard">Dashboards</Link>
              <Link to="/reports">Reports</Link>
              <Link to="/pricing">Pricing</Link>
            </>
          )}
        </nav>
        <div className="header-actions">
          {user ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

