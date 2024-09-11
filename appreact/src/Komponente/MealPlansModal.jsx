import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa"; 
import { CgDetailsMore } from "react-icons/cg";
import MealPlanModal from './MealPlanModal';
import './MealPlansModal.css';

const MealPlansModal = ({ user, onClose }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [meals, setMeals] = useState([]);
  const [modalMode, setModalMode] = useState(null); // Mode for ADD or UPDATE
  const [editingMealPlan, setEditingMealPlan] = useState(null); // MealPlan being edited
  const [newMeal, setNewMeal] = useState({ name: "", description: "", calories: "", meal_type: "", date: "", time: "" });

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

  const handleDeleteMealPlan = async (mealPlanId) => {
    const token = sessionStorage.getItem("auth_token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/meal-plans/${mealPlanId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMealPlans(mealPlans.filter((plan) => plan.id !== mealPlanId)); // Remove the meal plan from state
      setSelectedMealPlan(null); // Clear selected meal plan if deleted
    } catch (err) {
      console.error("Failed to delete meal plan:", err);
    }
  };

  const handleDeleteMeal = async (mealId) => {
    const token = sessionStorage.getItem("auth_token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/meals/${mealId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMeals(meals.filter((meal) => meal.id !== mealId)); // Remove the meal from state
    } catch (err) {
      console.error("Failed to delete meal:", err);
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

  const handleCreateMeal = async () => {
    const token = sessionStorage.getItem("auth_token");
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/meals', {
        ...newMeal,
        meal_plan_id: selectedMealPlan.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMeals([...meals, response.data.data]); // Add new meal to the state
      setNewMeal({ name: "", description: "", calories: "", meal_type: "", date: "", time: "" }); // Clear form
    } catch (err) {
      console.error("Failed to create meal:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Meal Plans for {user.name}</h2>
        <button className="close-button" onClick={onClose}>Close</button>
        <button onClick={handleOpenAddModal}><FaPlus /> </button>

        {loading ? (
          <p>Loading meal plans...</p>
        ) : mealPlans.length > 0 ? (
          <ul>
            {mealPlans.map((plan) => (
              <li key={plan.id}>
                {plan.title} - {plan.total_calories} calories
                <div className="button-group">
                  <button onClick={() => handleViewMeals(plan)}><CgDetailsMore /> </button>
                  <button onClick={() => handleOpenUpdateModal(plan)}><FaEdit /> </button>
                  <button onClick={() => handleDeleteMealPlan(plan.id)}><FaTrash /> </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No meal plans found for this user.</p>
        )}

        {selectedMealPlan && (
          <div>
            <h3>Meals for {selectedMealPlan.title}</h3>

            {/* Form for adding a new meal */}
            <div>
              <h4>Add New Meal</h4>
              <input
                type="text"
                placeholder="Meal Name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newMeal.description}
                onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Calories"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              />
              <input
                type="text"
                placeholder="Meal Type"
                value={newMeal.meal_type}
                onChange={(e) => setNewMeal({ ...newMeal, meal_type: e.target.value })}
              />
              <input
                type="date"
                value={newMeal.date}
                onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
              />
              <input
                type="time"
                value={newMeal.time}
                onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
              />
              <button onClick={handleCreateMeal}><FaPlus /> </button>
            </div>

            {meals.length > 0 ? (
              <ul>
                {meals.map((meal) => (
                  <li key={meal.id}>
                    {meal.name} - {meal.calories} calories
                    <div className="button-group">
                      <button onClick={() => handleDeleteMeal(meal.id)}><FaTrash /> </button>
                    </div>
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
