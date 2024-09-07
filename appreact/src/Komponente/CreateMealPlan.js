import React, { useState } from "react";
import axios from "axios";

const CreateMealPlan = () => {
  const [period, setPeriod] = useState("");
  const [totalCalories, setTotalCalories] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateMealPlan = async () => {
    setLoading(true);
    setError("");
    try {
      // Retrieve the auth token from session storage
      const token = sessionStorage.getItem("auth_token");
  
      // Make the request with the token included in the headers
      const response = await axios.post(
        "http://127.0.0.1:8000/api/meal-plans/create",
        {
          period,
          total_calories: totalCalories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );
      setMealPlan(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to create meal plan. Please try again.");
      setLoading(false);
    }
  };
  

  return (
    <div className="meal-plan-container">
      <h1>Create a Custom Meal Plan</h1>
      <div className="form-group">
        <label htmlFor="period">Period (in days)</label>
        <input
          type="number"
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalCalories">Total Calories</label>
        <input
          type="number"
          id="totalCalories"
          value={totalCalories}
          onChange={(e) => setTotalCalories(e.target.value)}
        />
      </div>
      <button className="action-button" onClick={handleCreateMealPlan} disabled={loading}>
        {loading ? "Generating Plan..." : "Create Meal Plan"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {mealPlan && (
        <div className="meal-plan-result">
          <h2>Generated Meal Plan</h2>
          <table className="meal-plan-table">
            <thead>
              <tr>
                <th>Meal Name</th>
                <th>Description</th>
                <th>Calories</th>
                <th>Meal Type</th>
              </tr>
            </thead>
            <tbody>
              {mealPlan.meals.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.name}</td>
                  <td>{meal.description}</td>
                  <td>{meal.calories}</td>
                  <td>{meal.meal_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CreateMealPlan;
