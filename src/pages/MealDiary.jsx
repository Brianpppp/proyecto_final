import React, { useState } from 'react';
import { getMealPlan } from '../services/Api';
import '../styles/MealDiary.css';
import Navbar from '../components/Navbar';
import RecipeDetails from '../components/RecipeDetails'; // Importa el componente RecipeDetails

const MealDiary = () => {
  const [timeFrame, setTimeFrame] = useState('day');
  const [targetCalories, setTargetCalories] = useState('');
  const [diet, setDiet] = useState('');
  const [exclude, setExclude] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [userMealData, setUserMealData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null); // Nuevo estado para el ID de la receta seleccionada
  const [showRecipeDetails, setShowRecipeDetails] = useState(false); // Nuevo estado para controlar la visibilidad de los detalles de la receta

  const handleGenerateMealPlan = async () => {
    try {
      const plan = await getMealPlan(timeFrame, targetCalories, diet, exclude);
      setMealPlan(plan);
      const combinedMealData = plan.meals.map((meal) => {
        const userData = userMealData.find((userMeal) => userMeal.id === meal.id);
        return {
          ...meal,
          ...userData,
        };
      });
      setMealPlan({ ...plan, meals: combinedMealData });
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  const handleRecipeClick = (recipeId, e) => {
    e.stopPropagation(); // Detiene la propagación del evento de clic
    setSelectedRecipeId(recipeId); // Establece el ID de la receta seleccionada
    setShowRecipeDetails(true); // Muestra los detalles de la receta al hacer clic en ella
  };

  const handleCloseRecipeDetails = () => {
    setSelectedRecipeId(null); // Resetea el ID de la receta seleccionada
    setShowRecipeDetails(false); // Oculta los detalles de la receta al cerrarlos
  };

  return (
    <div className="meal-diary-container">
      <Navbar/>
      <h2 className="title">Generate Meal Plan</h2>
      <div className="meal-container">
        <label>
          Time Frame:
          <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
            <option value="day">Day</option>
          </select>
        </label>
        <label>
          Target Calories:
          <input type="number" value={targetCalories} onChange={(e) => setTargetCalories(e.target.value)} />
        </label>
        <label>
          Diet:
          <input type="text" value={diet} onChange={(e) => setDiet(e.target.value)} />
        </label>
        <label>
          Exclude Ingredients:
          <input type="text" value={exclude} onChange={(e) => setExclude(e.target.value)} />
        </label>
        <button className="generate-button" onClick={handleGenerateMealPlan}>Generate Meal Plan</button>
      </div>
      {mealPlan && (
        <div className="meal-plan-container">
          <h2 className="title">Meal Plan for Today</h2>
          {mealPlan.meals.map((meal, index) => (
            <div key={index} className="meal-item" onClick={(e) => handleRecipeClick(meal.id, e)}>
              <h3>{meal.title}</h3>
              <img src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`} alt={meal.title} />
              <p className="detail">Ready in: {meal.readyInMinutes} minutes</p>
              <p className="detail">Servings: {meal.servings}</p>
            </div>
          ))}
          <div className="nutrients-container">
            <p className="title">Nutrients:</p>
            <ul>
              <li>Calories: {mealPlan.nutrients.calories}</li>
              <li>Carbohydrates: {mealPlan.nutrients.carbohydrates}</li>
              <li>Fat: {mealPlan.nutrients.fat}</li>
              <li>Protein: {mealPlan.nutrients.protein}</li>
            </ul>
          </div>
        </div>
      )}
      
      {showRecipeDetails && (
        <>
          <div  onClick={handleCloseRecipeDetails}></div>
          <div className='overlay'>
          <RecipeDetails recipeId={selectedRecipeId} onClose={handleCloseRecipeDetails} />
          </div>
        </>
        
      )}
    </div>
  );
};

export default MealDiary;
