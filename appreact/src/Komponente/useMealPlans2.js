import { useState, useEffect } from 'react';
import axios from 'axios';

const useMealPlans2 = (currentPage, itemsPerPage) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    const fetchMealPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/meal-plans/paginated?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`
          }
        });
        
        // Update state with paginated data
        setMealPlans(response.data.data); // Planovi iz odgovora
        setTotalPages(response.data.meta.last_page); // Ukupan broj stranica iz meta podataka
      } catch (err) {
        setError("Failed to load meal plans");
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, [currentPage, itemsPerPage]);

  return { mealPlans, loading, error, totalPages };
};

export default useMealPlans2;
