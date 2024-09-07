import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';
import RegistrationForm from './Komponente/RegistrationForm';
import CreateMealPlan from './Komponente/CreateMealPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/createmealplan" element={<CreateMealPlan />} />
      
      </Routes>
    </Router>
  );
}

export default App;
