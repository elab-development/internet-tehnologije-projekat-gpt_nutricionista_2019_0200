import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './Komponente/Pocetna';
import LoginForm from './Komponente/LoginForm';
import RegistrationForm from './Komponente/RegistrationForm';
import CreateMealPlan from './Komponente/CreateMealPlan';
import MyMealPlans from './Komponente/MyMealPlans';
import Navbar from './Komponente/Navbar';
import UserList from './Komponente/UserList';
import NutritionixAPIComponent from './Komponente/NutritionixAPIComponent';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user and token from sessionStorage on initial render
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    const savedToken = sessionStorage.getItem('auth_token');
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} token={token} setUser={setUser} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/login" element={<LoginForm setUser={setUser} setToken={setToken} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/food" element={<NutritionixAPIComponent />} />

        {token && (
          <>
            <Route path="/createmealplan" element={<CreateMealPlan />} />
            <Route path="/myMealPlans" element={<MyMealPlans />} />
            <Route path="/userList" element={<UserList />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
