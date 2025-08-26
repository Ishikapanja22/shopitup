import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">

          {/* Brand Description */}
          <div className="col-md-3 mb-4">
            <h5>ShopItUp</h5>
            <p>Your premium shopping destination for quality products at great prices.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 mb-4">
            <h6>Customer Service</h6>
            <ul className="list-unstyled">
              <li><Link to="/faq" className="text-light text-decoration-none">FAQ</Link></li>
              <li><Link to="/shipping" className="text-light text-decoration-none">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-light text-decoration-none">Returns</Link></li>
              <li><Link to="/size-guide" className="text-light text-decoration-none">Size Guide</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-3 mb-4">
            <h6>Follow Us</h6>
            <div className="d-flex">
              <a href="#" className="text-light me-3"><i className="fab fa-facebook fa-2x"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-twitter fa-2x"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-instagram fa-2x"></i></a>
            </div>
          </div>
        </div>

        <hr className="my-4" />
        <div className="text-center">
          <p>&copy; 2024 ShopItUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
