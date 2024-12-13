import React, { useEffect, useState } from "react";
import axios from "axios";
import './MealDetailsModal.css';

const MealDetailsModal = ({ mealPlan, onClose }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [sortField, setSortField] = useState("name"); // State for sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

  useEffect(() => {
    const fetchMeals = async () => {
      const token = sessionStorage.getItem("auth_token");
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/meals?meal_plan_id=${mealPlan.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMeals(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch meals.");
        setLoading(false);
      }
    };

    fetchMeals();
  }, [mealPlan.id]);

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Function to handle sorting
  const handleSort = (field) => {
    const order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Sort and filter meals
  const filteredAndSortedMeals = meals
    .filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm) ||
      meal.description?.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Meals for {mealPlan.title}</h2>
        <button className="close-button" onClick={onClose}>Close</button>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        {meals.length > 0 ? (
          <table className="meal-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  Meal Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th onClick={() => handleSort("description")}>
                  Description {sortField === "description" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th onClick={() => handleSort("calories")}>
                  Calories {sortField === "calories" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th onClick={() => handleSort("meal_type")}>
                  Meal Type {sortField === "meal_type" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedMeals.map((meal) => (
                <tr key={meal.id}>
                  <td>{meal.name}</td>
                  <td>{meal.description || "No description"}</td>
                  <td>{meal.calories}</td>
                  <td>{meal.meal_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No meals found for this meal plan.</p>
        )}
      </div>
    </div>
  );
};

export default MealDetailsModal;
