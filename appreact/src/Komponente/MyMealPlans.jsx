import React from "react";
import useMealPlans from "./useMealPlans";  

const MyMealPlans = () => {
  const { mealPlans, loading, error } = useMealPlans();

  if (loading) return <p>Loading meal plans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Meal Plans</h1>
      {mealPlans.length > 0 ? (
        <ul>
          {mealPlans.map((mealPlan) => (
            <li key={mealPlan.id}>
              {mealPlan.title} - {mealPlan.total_calories} calories
            </li>
          ))}
        </ul>
      ) : (
        <p>No meal plans found.</p>
      )}
    </div>
  );
};

export default MyMealPlans;
