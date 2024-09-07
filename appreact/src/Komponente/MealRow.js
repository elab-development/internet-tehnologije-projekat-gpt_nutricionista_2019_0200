import React from "react";

const MealRow = ({ meal }) => {
  return (
    <tr>
      <td>{meal.name}</td>
      <td>{meal.description}</td>
      <td>{meal.calories}</td>
      <td>{meal.meal_type}</td>
    </tr>
  );
};

export default MealRow;
