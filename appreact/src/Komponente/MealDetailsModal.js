import React, { useEffect, useState } from "react";
import axios from "axios";
import './MealDetailsModal.css';

const MealDetailsModal = ({ mealPlan, onClose }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Meals for {mealPlan.title}</h2>
        <button className="close-button" onClick={onClose}>Close</button>
        {meals.length > 0 ? (
          <table className="meal-table">
            <thead>
              <tr>
                <th>Meal Name</th>
                <th>Description</th>
                <th>Calories</th>
                <th>Meal Type</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
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
