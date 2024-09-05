import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      
      // Navigacija ka login strani nakon uspešne registracije
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
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="button" className="action-button" onClick={handleNextStep}>Next</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="height">Height (cm):</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg):</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date_of_birth">Date of Birth:</label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="food_preferences">Food Preferences:</label>
                <input
                  type="text"
                  id="food_preferences"
                  name="food_preferences"
                  value={formData.food_preferences}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dietary_goals">Dietary Goals:</label>
                <input
                  type="text"
                  id="dietary_goals"
                  name="dietary_goals"
                  value={formData.dietary_goals}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="activity_level">Activity Level:</label>
                <input
                  type="text"
                  id="activity_level"
                  name="activity_level"
                  value={formData.activity_level}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="target_weight">Target Weight (kg):</label>
                <input
                  type="number"
                  id="target_weight"
                  name="target_weight"
                  value={formData.target_weight}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="medical_conditions">Medical Conditions:</label>
                <input
                  type="text"
                  id="medical_conditions"
                  name="medical_conditions"
                  value={formData.medical_conditions}
                  onChange={handleChange}
                />
              </div>
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
