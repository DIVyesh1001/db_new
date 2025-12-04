import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { datasetService } from '../services/datasetService';
import SubscriptionModal from '../components/SubscriptionModal';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    // Only load datasets if user is logged in
    if (user) {
      loadDatasets();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadDatasets = async () => {
    try {
      const data = await datasetService.getAllDatasets();
      setDatasets(data.datasets || []);
    } catch (error) {
      console.error('Failed to load datasets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDatasetClick = (datasetId) => {
    if (!user) {
      // Check if it's a sample dataset (not a real MongoDB ObjectId)
      if (datasetId.startsWith('sample-')) {
        // For sample datasets, just redirect to login without dataset ID
        // After login, user will see real datasets on dashboard
        navigate('/login');
      } else {
        // For real dataset IDs, redirect to login with the dataset ID as return path
        navigate(`/login?redirect=/dataset/${datasetId}`);
      }
    } else {
      // User is logged in, navigate directly to dataset
      navigate(`/dataset/${datasetId}`);
    }
  };

  const markets = [
    'Population', 'India Macroeconomics Indicator Report Oct 2025', 'Q-Commerce', 'Beauty', 'Fashion',
    'Foodservice', 'Payments', 'Airport Retail', 'Liquor', 'Smartphones'
  ];

  const companies = [
    'Decathlon', 'Zudio', 'FirstCry', 'Nykaa', 'Blinkit', 'DMart'
  ];

  // Show sample datasets for logged-out users
  const sampleDatasets = [
    { id: 'sample-1', name: 'Population Data', description: 'Comprehensive population data across India', fileType: 'csv', sheets: [] },
    { id: 'sample-2', name: 'Retail Market Analysis', description: 'Detailed retail market insights and trends', fileType: 'xlsx', sheets: ['Sheet1', 'Sheet2'] },
    { id: 'sample-3', name: 'Consumer Behavior Data', description: 'Consumer behavior patterns and analytics', fileType: 'csv', sheets: [] },
  ];

  const displayDatasets = user ? datasets : sampleDatasets;

  return (
    <div className="dashboard">
      <section className="hero">
        <input 
          className="search-box" 
          placeholder="Search markets, brands, cities, categories..." 
        />
      </section>

      <section className="kpi-grid">
        <div className="card">
          <h3>₹XXT</h3>
          <p>Retail Market Size</p>
        </div>
        <div className="card">
          <h3>₹XXB</h3>
          <p>Online Commerce</p>
        </div>
        <div className="card">
          <h3>₹XXB</h3>
          <p>Quick Commerce</p>
        </div>
        <div className="card">
          <h3>XXB Txns</h3>
          <p>UPI Payments (Monthly)</p>
        </div>
      </section>

      <section className="dashboards">
        <div className="dash-card">Retail Store Locator →</div>
        <div className="dash-card">UPI & Payments Monitor →</div>
        <div className="dash-card">Quick Commerce Tracker →</div>
      </section>

      <section className="charts">
        <div className="chart">Chart: Zudio Store Growth</div>
        <div className="chart">Chart: UPI Volume Trend</div>
        <div className="chart">Chart: Beauty Market YoY</div>
      </section>

      <section className="datasets-section">
        <h2 className="section-title">Available Datasets</h2>
        {!user && (
          <p className="login-prompt">
            <strong>Login required</strong> to view full dataset details and data
          </p>
        )}
        <div className="datasets-grid">
          {displayDatasets.map((dataset) => (
            <div
              key={dataset.id}
              className="dataset-card"
              onClick={() => handleDatasetClick(dataset.id)}
            >
              <div className="dataset-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#51087e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#51087e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="#51087e" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 17H8" stroke="#51087e" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 9H9H8" stroke="#51087e" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>{dataset.name}</h3>
              <p>{dataset.description || 'No description available'}</p>
              <div className="dataset-meta">
                <span className="file-type">{dataset.fileType.toUpperCase()}</span>
                {dataset.sheets && dataset.sheets.length > 0 && (
                  <span className="sheets-count">{dataset.sheets.length} sheet{dataset.sheets.length !== 1 ? 's' : ''}</span>
                )}
              </div>
              {!user && (
                <div className="login-badge">Login to View</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="markets">
        {markets.map((market, index) => (
          <div
            key={index}
            className="market-tile"
            onClick={() => {
              // Special case: macroeconomics report routes to dedicated macro page
              if (market === 'India Macroeconomics Indicator Report Oct 2025') {
                if (!user) {
                  navigate('/login?redirect=/macroeconomics');
                } else {
                  navigate('/macroeconomics');
                }
                return;
              }

              if (!user) {
                navigate('/login?redirect=/markets/' + market.toLowerCase());
              } else {
                navigate(`/markets/${market.toLowerCase()}`);
              }
            }}
          >
            {market}
          </div>
        ))}
      </section>

      <section className="companies">
        {companies.map((company, index) => (
          <div key={index} className="company-tile">{company}</div>
        ))}
      </section>

      <section className="reports">
        <div className="report-card">K-Beauty India 2025 →</div>
        <div className="report-card">Quick Commerce Outlook →</div>
        <div className="report-card">India Retail Landscape →</div>
      </section>

      {!user && (
        <section className="cta">
          <h2>Unlock India's Retail & Consumer Data</h2>
          <p>Full access to dashboards, charts, reports & weekly insights</p>
          <button onClick={() => setShowSubscriptionModal(true)}>Subscribe to Datum Premium</button>
        </section>
      )}

      {user && (
        <section className="cta">
          <h2>Unlock India's Retail & Consumer Data</h2>
          <p>Full access to dashboards, charts, reports & weekly insights</p>
          <button onClick={() => setShowSubscriptionModal(true)}>Upgrade to Premium</button>
        </section>
      )}

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default Dashboard;
