import React, { useEffect, useState } from "react";
import axios from "axios";
import MealPlanModal from './MealPlanModal'; // Import new modal component
import './MealPlansModal.css';

const MealPlansModal = ({ user, onClose }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [meals, setMeals] = useState([]);
  const [modalMode, setModalMode] = useState(null); // Mode for ADD or UPDATE
  const [editingMealPlan, setEditingMealPlan] = useState(null); // MealPlan being edited

  useEffect(() => {
    const fetchMealPlans = async () => {
      const token = sessionStorage.getItem("auth_token");
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/meal-plans/user?user_id=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMealPlans(response.data.data); // Assuming response contains "data" field
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, [user.id]);

  const handleViewMeals = async (mealPlan) => {
    setSelectedMealPlan(mealPlan);
    const token = sessionStorage.getItem("auth_token");
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/meals?meal_plan_id=${mealPlan.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMeals(response.data.data); // Assuming response contains "data" field
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateOrUpdateMealPlan = async (formData) => {
    const token = sessionStorage.getItem("auth_token");
    try {
      if (modalMode === "ADD") {
        const response = await axios.post('http://127.0.0.1:8000/api/meal-plans', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMealPlans([...mealPlans, response.data.data]); // Add new meal plan
      } else if (modalMode === "UPDATE") {
        const response = await axios.put(`http://127.0.0.1:8000/api/meal-plans/${editingMealPlan.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMealPlans(
          mealPlans.map((plan) => (plan.id === editingMealPlan.id ? response.data.data : plan))
        ); // Update existing plan
      }
      setModalMode(null);
      setEditingMealPlan(null);
    } catch (err) {
      console.error(`Failed to ${modalMode === 'ADD' ? 'create' : 'update'} meal plan:`, err);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode("ADD");
    setEditingMealPlan(null); // Clear any editing state
  };

  const handleOpenUpdateModal = (mealPlan) => {
    setModalMode("UPDATE");
    setEditingMealPlan(mealPlan);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Meal Plans for {user.name}</h2>
        <button onClick={onClose}>Close</button>
        <button onClick={handleOpenAddModal}>Add Meal Plan</button>

        {loading ? (
          <p>Loading meal plans...</p>
        ) : mealPlans.length > 0 ? (
          <ul>
            {mealPlans.map((plan) => (
              <li key={plan.id}>
                {plan.title} - {plan.total_calories} calories
                <button onClick={() => handleViewMeals(plan)}>View Meals</button>
                <button onClick={() => handleOpenUpdateModal(plan)}>Edit Plan</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No meal plans found for this user.</p>
        )}

        {selectedMealPlan && (
          <div>
            <h3>Meals for {selectedMealPlan.title}</h3>
            {meals.length > 0 ? (
              <ul>
                {meals.map((meal) => (
                  <li key={meal.id}>
                    {meal.name} - {meal.calories} calories
                  </li>
                ))}
              </ul>
            ) : (
              <p>No meals found for this plan.</p>
            )}
          </div>
        )}

        {modalMode && (
          <MealPlanModal
            mode={modalMode}
            mealPlan={editingMealPlan}
            onSubmit={handleCreateOrUpdateMealPlan}
            onClose={() => setModalMode(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MealPlansModal;
