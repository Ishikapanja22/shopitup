import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to your backend (create POST /api/contact if needed)
      await axios.post('/api/contact', formData);

      setStatus('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Send message error:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ marginTop: 76, padding: '50px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2 className="text-center mb-4" style={{ color: 'var(--maroon)' }}>
              Contact Us
            </h2>
            <div className="row">
              <div className="col-md-6">
                <div className="card p-4 h-100">
                  <h5>Get in Touch</h5>

                  {status && (
                    <div className={`alert ${status.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                      {status}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        name="message"
                        className="form-control"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-maroon">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card p-4 h-100">
                  <h5>Contact Information</h5>
                  <div className="mb-3">
                    <i className="fas fa-map-marker-alt me-2" style={{ color: 'var(--maroon)' }}></i>
                    <strong>Address:</strong><br />
                    123 Shopping Street<br />
                    Commerce City, CC 12345
                  </div>
                  <div className="mb-3">
                    <i className="fas fa-phone me-2" style={{ color: 'var(--maroon)' }}></i>
                    <strong>Phone:</strong><br />
                    +1 (555) 123-4567
                  </div>
                  <div className="mb-3">
                    <i className="fas fa-envelope me-2" style={{ color: 'var(--maroon)' }}></i>
                    <strong>Email:</strong><br />
                    support@shopitup.com
                  </div>
                  <div className="mb-3">
                    <i className="fas fa-clock me-2" style={{ color: 'var(--maroon)' }}></i>
                    <strong>Business Hours:</strong><br />
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
