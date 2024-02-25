
import React, { useState, useEffect } from 'react';
import { fetchRandomRecipes } from '../services/Api';
import '../styles/RecipeRandom.css'
function RecipesRandom({ number, includeTags, excludeTags, setSelectedRecipe }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function getRandomRecipes() {
            const randomRecipes = await fetchRandomRecipes(number, includeTags, excludeTags);
            setRecipes(randomRecipes);
        }
        getRandomRecipes();
    }, [number, includeTags, excludeTags]);

    const handleRecipeClick = (recipeId) => {
        setSelectedRecipe(recipeId);
    };

    return (
       
        <div className="random-recipes-container">
            {recipes.map(recipe => (
                <div key={recipe.id} className="random-recipe" onClick={() => handleRecipeClick(recipe.id)}>
                    <h3>{recipe.title}</h3>
                    <img src={recipe.image} alt={recipe.title} />
                </div>
            ))}
        </div>
    );
}

export default RecipesRandom;
