import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/login" element={<LoginForm />} />
      
      </Routes>
    </Router>
  );
}

export default App;
