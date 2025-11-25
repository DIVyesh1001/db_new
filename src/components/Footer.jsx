import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Markets</h4>
          <p>Retail</p>
          <p>Q-Commerce</p>
          <p>Beauty</p>
        </div>
        <div className="footer-column">
          <h4>Dashboards</h4>
          <p>UPI</p>
          <p>Store Locator</p>
        </div>
        <div className="footer-column">
          <h4>Companies</h4>
          <p>Zudio</p>
          <p>Decathlon</p>
        </div>
        <div className="footer-column">
          <h4>About</h4>
          <p>Contact</p>
          <p>Privacy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

