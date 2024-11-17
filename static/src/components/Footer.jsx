import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/about" className="footer-link">About</Link>
        <a href="mailto:contact@yourdomain.com" className="footer-link">Contact</a>
      </div>
        WatClub &copy; {new Date().getFullYear()} <div className="footer-copyright"> All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
