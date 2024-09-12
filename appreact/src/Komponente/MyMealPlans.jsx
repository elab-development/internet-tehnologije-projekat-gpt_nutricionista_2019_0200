import React, { useState } from "react";
import useMealPlans from "./useMealPlans";  
import MealDetailsModal from "./MealDetailsModal";  
import './MyMealPlans.css';  
import useMealPlans2 from "./useMealPlans2";

const MyMealPlans = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(""); // Search/filter state

  // Fetch meal plans with pagination
  const { mealPlans, loading, error, totalPages } = useMealPlans2(currentPage, itemsPerPage);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);

  const handleOpenModal = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
  };

  const handleCloseModal = () => {
    setSelectedMealPlan(null);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (loading) return <p>Loading meal plans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="meal-plans-container">
      <h1>Your Meal Plans</h1>
      
      {/* Filter/Search Input */}
      <input
        type="text"
        placeholder="Search by title or calories..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {mealPlans.length > 0 ? (
        <>
          <ul className="meal-plan-list">
            {mealPlans.map((mealPlan) => (
              <li key={mealPlan.id} className="meal-plan-item">
                <span>{mealPlan.title} - {mealPlan.total_calories} calories</span>
                <button onClick={() => handleOpenModal(mealPlan)}>Details</button>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
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
