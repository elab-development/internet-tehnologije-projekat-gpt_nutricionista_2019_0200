import React, { useState, useEffect } from "react";
import './MealPlanModal.css';

const MealPlanModal = ({ mode, mealPlan = {}, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    total_calories: "",
    activity_level: "",
    start_date: "",
    end_date: "",
    protein_goal: "",
    fat_goal: "",
    carb_goal: "",
    status: "active", // Default status for new plans
  });

  // Popuni formu ako je mod "UPDATE" i postojeći mealPlan je prosleđen
  useEffect(() => {
    if (mode === "UPDATE" && mealPlan) {
      setFormData({
        title: mealPlan.title || "",
        total_calories: mealPlan.total_calories || "",
        activity_level: mealPlan.activity_level || "",
        start_date: mealPlan.start_date || "",
        end_date: mealPlan.end_date || "",
        protein_goal: mealPlan.protein_goal || "",
        fat_goal: mealPlan.fat_goal || "",
        carb_goal: mealPlan.carb_goal || "",
        status: mealPlan.status || "active",
      });
    }
  }, [mode, mealPlan]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pozovi onSubmit sa prikupljenim podacima
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode === "ADD" ? "Create Meal Plan" : "Update Meal Plan"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="total_calories"
            placeholder="Total Calories"
            value={formData.total_calories}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="activity_level"
            placeholder="Activity Level"
            value={formData.activity_level}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="protein_goal"
            placeholder="Protein Goal"
            value={formData.protein_goal}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="fat_goal"
            placeholder="Fat Goal"
            value={formData.fat_goal}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="carb_goal"
            placeholder="Carb Goal"
            value={formData.carb_goal}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button type="submit">{mode === "ADD" ? "Create" : "Update"}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default MealPlanModal;
