import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);  
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    password_confirmation: 'password123',
    height: '180',
    weight: '75',
    date_of_birth: '1990-05-15',
    food_preferences: 'Vegetarian',
    dietary_goals: 'Lose weight',
    activity_level: 'Moderate',
    target_weight: '70',
    medical_conditions: 'None'
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your input.');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form-section">
        <h1>Register an Account</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <InputField
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
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
              <InputField
                label="Confirm Password"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
              <button type="button" className="action-button" onClick={handleNextStep}>Next</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <InputField
                label="Height (cm)"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
              <InputField
                label="Weight (kg)"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
              <InputField
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
              <InputField
                label="Food Preferences"
                type="text"
                name="food_preferences"
                value={formData.food_preferences}
                onChange={handleChange}
              />
              <InputField
                label="Dietary Goals"
                type="text"
                name="dietary_goals"
                value={formData.dietary_goals}
                onChange={handleChange}
              />
              <InputField
                label="Activity Level"
                type="text"
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
              />
              <InputField
                label="Target Weight (kg)"
                type="number"
                name="target_weight"
                value={formData.target_weight}
                onChange={handleChange}
              />
              <InputField
                label="Medical Conditions"
                type="text"
                name="medical_conditions"
                value={formData.medical_conditions}
                onChange={handleChange}
              />
              <div className="button-group">
                <button type="button" className="action-button" onClick={handlePrevStep}>Back</button>
                <button type="submit" className="action-button">Register</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
