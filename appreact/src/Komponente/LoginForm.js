import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import './LoginForm.css';  
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser, setToken }) => {
  const [formData, setFormData] = useState({
    email: 'wturcotte@example.com',
    password: 'password',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let navigate = useNavigate();

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
      
      const token = response.data.access_token;
      const user = response.data.user;
      sessionStorage.setItem('auth_token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      
      setSuccess('Login successful!');
      setError(null);
      if(response.data.user.role=="admin"
      ){
        navigate('/createmealplan');
      }else{
        navigate('/userList');
      }
    
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
