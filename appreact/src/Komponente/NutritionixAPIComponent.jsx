import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Potrebno za Chart.js
import './NutritionixAPIComponent.css'; // Kreirajte CSS fajl za stilove

const NutritionixAPIComponent = () => {
  const [query, setQuery] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Postavite ovde svoj API_KEY i APP_ID sa Nutritionix API-ja
  const API_KEY = '2a28cad770c01e4fe562a9201d4300cc';
  const APP_ID = 'b54179bd';

  // Preporučene dnevne vrednosti (prosečne za odrasle)
  const recommendedValues = {
    calories: 2000,
    protein: 50,
    carbohydrates: 275,
    fat: 78,
    saturatedFat: 20,
    cholesterol: 300,
    sodium: 2300,
    potassium: 4700,
    sugar: 50,
    fiber: 28,
  };

  const fetchFoodData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          query: query,  // telo zahteva
        },
        {
          headers: {
            'x-app-id': APP_ID,
            'x-app-key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      setFoodData(response.data.foods[0]); // Prikazujemo samo prvi rezultat
      setLoading(false);
    } catch (error) {
      setError('Greška prilikom učitavanja podataka');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query !== '') {
      fetchFoodData();
    }
  };

  const getChartData = () => {
    if (!foodData) return null;

    return {
      labels: ['Kalorije', 'Proteini', 'Ugljeni hidrati', 'Masti', 'Zasićene masti', 'Holesterol', 'Sodium', 'Kalijum', 'Šećeri', 'Vlakna'],
      datasets: [
        {
          label: 'Uneto',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: [
            foodData.nf_calories,
            foodData.nf_protein,
            foodData.nf_total_carbohydrate,
            foodData.nf_total_fat,
            foodData.nf_saturated_fat,
            foodData.nf_cholesterol,
            foodData.nf_sodium,
            foodData.nf_potassium,
            foodData.nf_sugars,
            foodData.nf_dietary_fiber,
          ],
        },
        {
          label: 'Preporučeno',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [
            recommendedValues.calories,
            recommendedValues.protein,
            recommendedValues.carbohydrates,
            recommendedValues.fat,
            recommendedValues.saturatedFat,
            recommendedValues.cholesterol,
            recommendedValues.sodium,
            recommendedValues.potassium,
            recommendedValues.sugar,
            recommendedValues.fiber,
          ],
        },
      ],
    };
  };

  return (
    <div className="nutritionix-container">
      <h2>Nutritionix API - Nutritivne vrednosti hrane</h2>
      <form onSubmit={handleSubmit} className="nutritionix-form">
        <input
          type="text"
          placeholder="Unesite ime hrane"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Pretraži</button>
      </form>

      {loading && <p>Učitavam...</p>}
      {error && <p>{error}</p>}
      
      {foodData && (
        <div>
          <h3>Rezultati za: {foodData.food_name}</h3>
          <table border="1" className="nutrition-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Količina</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Brend</td>
                <td>{foodData.brand_name ? foodData.brand_name : 'Nema brenda'}</td>
              </tr>
              <tr>
                <td>Porcija</td>
                <td>{foodData.serving_qty} {foodData.serving_unit} ({foodData.serving_weight_grams}g)</td>
              </tr>
              <tr>
                <td>Kalorije</td>
                <td>{foodData.nf_calories} kcal</td>
              </tr>
              <tr>
                <td>Proteini</td>
                <td>{foodData.nf_protein} g</td>
              </tr>
              <tr>
                <td>Ugljeni hidrati</td>
                <td>{foodData.nf_total_carbohydrate} g</td>
              </tr>
              <tr>
                <td>Masti</td>
                <td>{foodData.nf_total_fat} g</td>
              </tr>
              <tr>
                <td>Zasićene masti</td>
                <td>{foodData.nf_saturated_fat} g</td>
              </tr>
              <tr>
                <td>Holesterol</td>
                <td>{foodData.nf_cholesterol} mg</td>
              </tr>
              <tr>
                <td>Sodium</td>
                <td>{foodData.nf_sodium} mg</td>
              </tr>
              <tr>
                <td>Šećeri</td>
                <td>{foodData.nf_sugars} g</td>
              </tr>
              <tr>
                <td>Vlakna</td>
                <td>{foodData.nf_dietary_fiber} g</td>
              </tr>
              <tr>
                <td>Kalijum</td>
                <td>{foodData.nf_potassium} mg</td>
              </tr>
              <tr>
                <td>Fosfor</td>
                <td>{foodData.nf_p} mg</td>
              </tr>
            </tbody>
          </table>

          {/* Grafikon za poređenje sa dnevnim unosom */}
          <div className="chart-container">
            <Bar
              data={getChartData()}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionixAPIComponent;
