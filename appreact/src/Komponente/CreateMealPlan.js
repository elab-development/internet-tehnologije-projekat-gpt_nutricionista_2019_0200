import React, { useState } from "react";
import axios from "axios";
import MealRow from "./MealRow";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Importing the library for auto table creation
import './CreateMealPlan.css';

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
      const token = sessionStorage.getItem("auth_token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/meal-plans/create",
        {
          period,
          total_calories: totalCalories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Meal Name", "Description", "Calories", "Meal Type"];
    const tableRows = [];

    mealPlan.meals.forEach((meal) => {
      const mealData = [
        meal.name,
        meal.description,
        meal.calories,
        meal.meal_type,
      ];
      tableRows.push(mealData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("meal-plan.pdf");
  };

  return (
    <div className="meal-plan-container">
      <div className="form-container">
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
      </div>

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
                <MealRow key={index} meal={meal} />
              ))}
            </tbody>
          </table>
          <button className="action-button" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateMealPlan;
