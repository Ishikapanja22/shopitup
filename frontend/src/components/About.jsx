import React from 'react';

const About = () => {
  return (
    <div style={{ marginTop: 76, padding: '50px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <h2 className="mb-4" style={{ color: 'var(--maroon)' }}>
              About ShopItUp
            </h2>
            <p className="lead">
              We're passionate about bringing you the best shopping experience with premium products at competitive prices.
            </p>
            <p>
              Founded in 2024, ShopItUp has grown to become a trusted destination for online shopping. We carefully curate our product selection to ensure quality and value for our customers.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 text-center mb-4">
            <i className="fas fa-shipping-fast fa-3x mb-3" style={{ color: 'var(--maroon)' }}></i>
            <h5>Fast Shipping</h5>
            <p>Free shipping on orders over ₹50</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <i className="fas fa-shield-alt fa-3x mb-3" style={{ color: 'var(--maroon)' }}></i>
            <h5>Secure Shopping</h5>
            <p>Your data is protected with SSL encryption</p>
          </div>
          <div className="col-md-4 text-center mb-4">
            <i className="fas fa-headset fa-3x mb-3" style={{ color: 'var(--maroon)' }}></i>
            <h5>24/7 Support</h5>
            <p>Customer service available around the clock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
