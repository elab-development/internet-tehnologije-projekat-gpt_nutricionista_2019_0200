import React, { useState } from "react";
import useMealPlans from "./useMealPlans";  
import MealDetailsModal from "./MealDetailsModal";  
import './MyMealPlans.css';  

const MyMealPlans = () => {
  const { mealPlans, loading, error } = useMealPlans();
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);

  if (loading) return <p>Loading meal plans...</p>;
  if (error) return <p>{error}</p>;

  const handleOpenModal = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
  };

  const handleCloseModal = () => {
    setSelectedMealPlan(null);
  };

  return (
    <div className="meal-plans-container">
      <h1>Your Meal Plans</h1>
      {mealPlans.length > 0 ? (
        <ul className="meal-plan-list">
          {mealPlans.map((mealPlan) => (
            <li key={mealPlan.id} className="meal-plan-item">
              <span>{mealPlan.title} - {mealPlan.total_calories} calories</span>
              <button onClick={() => handleOpenModal(mealPlan)}>Details</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meal plans found.</p>
      )}
      {selectedMealPlan && (
        <MealDetailsModal 
          mealPlan={selectedMealPlan} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default MyMealPlans;
