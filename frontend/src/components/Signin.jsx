import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch('http://localhost:5000/api/users/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json(); 

  if (res.ok) {
    localStorage.setItem("token", data.token); 
    login(data.token);                         
    navigate("/account");                      
  } else {
    alert(data.message || 'Login failed');
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: 'var(--cream)' }}>
      <form className="card p-4" style={{ width: '300px' }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4" style={{ color: 'var(--maroon)' }}>Sign In</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-maroon w-100">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
