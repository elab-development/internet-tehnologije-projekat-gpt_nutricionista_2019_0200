import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';
import RegistrationForm from './Komponente/RegistrationForm';
import CreateMealPlan from './Komponente/CreateMealPlan';
import MyMealPlans from './Komponente/MyMealPlans';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/createmealplan" element={<CreateMealPlan />} />
        <Route path="/myMealPlans" element={<MyMealPlans />} />

      
      </Routes>
    </Router>
  );
}

export default App;
