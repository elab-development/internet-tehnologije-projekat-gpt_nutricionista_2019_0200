import React, { useState } from "react";
import useMealPlans from "./useMealPlans";  
import MealDetailsModal from "./MealDetailsModal";  
import './MyMealPlans.css';  

const MyMealPlans = () => {
  const { mealPlans, loading, error } = useMealPlans();
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(""); // Search/filter state

  const handleOpenModal = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
  };

  const handleCloseModal = () => {
    setSelectedMealPlan(null);
  };

  // Filter meal plans based on search term
  const filteredMealPlans = mealPlans.filter((mealPlan) => {
    return (
      mealPlan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mealPlan.total_calories.toString().includes(searchTerm)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMealPlans = filteredMealPlans.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredMealPlans.length / itemsPerPage);

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

      {currentMealPlans.length > 0 ? (
        <>
          <ul className="meal-plan-list">
            {currentMealPlans.map((mealPlan) => (
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
