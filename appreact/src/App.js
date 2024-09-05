import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Pocetna from './Komponente/Pocetna';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
      
      </Routes>
    </Router>
  );
}

export default App;
