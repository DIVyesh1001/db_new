import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SubscriptionModal from '../components/SubscriptionModal';
import './LoggedOutHomepage.css';

const LoggedOutHomepage = () => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <div className="logged-out-homepage">
      <section className="hero">
        <h1>India's Retail & Consumer Data Platform</h1>
        <p>Deep insights on retail, eCommerce, quick commerce, payments, and consumer markets.</p>
        <div className="cta-buttons">
          <Link to="/login">
            <button className="primary-btn">Get Started</button>
          </Link>
          <button className="secondary-btn">View Sample Data</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Market Dashboards</h3>
          <p>Track growth, category share, and trends across retail, eCommerce, and Q-commerce.</p>
        </div>
        <div className="feature-card">
          <h3>Company Profiles</h3>
          <p>Store counts, GMV, revenue trajectories, and market presence of leading brands.</p>
        </div>
        <div className="feature-card">
          <h3>City & Pincode Data</h3>
          <p>Ward-level and pincode-level population, store presence, and consumption metrics.</p>
        </div>
      </section>

      <section className="preview-section">
        <h2>Preview Datum Data</h2>
        <p>A glimpse of what you get after logging in.</p>
        <div className="preview-grid">
          <div className="preview-tile">Zudio Store Dashboard</div>
          <div className="preview-tile">UPI Payments Monitor</div>
          <div className="preview-tile">Retail Market Overview</div>
        </div>
      </section>

      <section className="footer-cta">
        <h2>Start Your Access to India's Retail Intelligence</h2>
        <p>Join now to unlock datasets, dashboards, company profiles, and weekly insights.</p>
        <button onClick={() => setShowSubscriptionModal(true)}>Subscribe to Datum</button>
      </section>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default LoggedOutHomepage;

