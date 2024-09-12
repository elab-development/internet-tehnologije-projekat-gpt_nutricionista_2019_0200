import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pocetna.css';  
 
const Pocetna = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Your Nutrition & Wellness Journey</h1>
          <p>Take control of your health with personalized nutrition advice, wellness tips, and a balanced lifestyle.</p>
 
        </div>
      </header>
      
      <section className="tips-section">
        <h2>Wellness Tips for a Balanced Life</h2>
        <div className="tips-container">
          <div className="tip-box">
            <h3>Stay Hydrated</h3>
            <p>Drinking enough water is crucial for your health. Aim for at least 8 glasses of water a day to keep your body energized and your mind sharp.</p>
          </div>
          <div className="tip-box">
            <h3>Eat Balanced Meals</h3>
            <p>A well-balanced meal includes proteins, healthy fats, and plenty of vegetables. Avoid processed food and try to cook at home.</p>
          </div>
          <div className="tip-box">
            <h3>Exercise Regularly</h3>
            <p>Physical activity is key to wellness. Even a 30-minute walk a day can make a significant impact on your overall health.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pocetna;
