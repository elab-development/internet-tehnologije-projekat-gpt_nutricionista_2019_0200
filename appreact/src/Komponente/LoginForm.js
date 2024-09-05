import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import './LoginForm.css';  

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      
      sessionStorage.setItem('auth_token', response.data.access_token);
      setSuccess('Login successful!');
      setError(null);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      setSuccess(null);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <h1>Login to Your Account</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="action-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
