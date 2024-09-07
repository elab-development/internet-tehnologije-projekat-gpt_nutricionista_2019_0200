import { useState, useEffect } from "react";
import axios from "axios";

const useMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      const token = sessionStorage.getItem("auth_token");   
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/meal-plans", {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        setMealPlans(response.data.data);  
      } catch (err) {
        setError("Failed to fetch meal plans.");
      } finally {
        setLoading(false);  
      }
    };

    fetchMealPlans();
  }, []);

  return { mealPlans, loading, error };
};

export default useMealPlans;
