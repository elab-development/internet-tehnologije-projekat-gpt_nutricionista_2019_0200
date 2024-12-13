import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ user, token, setUser, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/logout', 
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');
      setUser(null);
      setToken(null);
      navigate('/');
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/createmealplan">Create Meal Plan</Link>
            <Link to="/myMealPlans">My Meal Plans</Link>
            <Link to="/food">Food</Link>

            {user?.role === 'admin' && <Link to="/userList">User List</Link>}
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
