import React, { useEffect, useState } from "react";
import axios from "axios";
import './UserList.css';
import MealPlansModal from './MealPlansModal'; // Modal for viewing meal plans

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [searchFields, setSearchFields] = useState({
    name: "",
    email: "",
    height: "",
    weight: "",
    date_of_birth: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem("auth_token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (field, value) => {
    setSearchFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleViewMealPlans = (user) => {
    setSelectedUser(user); // Set the selected user for viewing meal plans
  };

  const handleCloseModal = () => {
    setSelectedUser(null); // Close modal
  };

  const filteredUsers = users.filter((user) => {
    return Object.keys(searchFields).every((key) => {
      if (!searchFields[key]) return true;
      return user[key]?.toString().toLowerCase().includes(searchFields[key].toLowerCase());
    });
  });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list-container">
      <h1>User List</h1>

      {/* Search Inputs */}
      <div className="search-fields">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchFields.name}
          onChange={(e) => handleSearchChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by email..."
          value={searchFields.email}
          onChange={(e) => handleSearchChange("email", e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by height..."
          value={searchFields.height}
          onChange={(e) => handleSearchChange("height", e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by weight..."
          value={searchFields.weight}
          onChange={(e) => handleSearchChange("weight", e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by date of birth..."
          value={searchFields.date_of_birth}
          onChange={(e) => handleSearchChange("date_of_birth", e.target.value)}
        />
      </div>

      {/* Displaying the User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.height}</td>
                <td>{user.weight}</td>
                <td>{user.date_of_birth}</td>
                <td>
                  <button onClick={() => handleViewMealPlans(user)}>
                    View Meal Plans
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Viewing Meal Plans */}
      {selectedUser && (
        <MealPlansModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserList;
