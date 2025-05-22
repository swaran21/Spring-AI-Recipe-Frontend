import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RecipeComponent() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const createRecipe = async (e) => {
    e.preventDefault(); 
    if (!ingredients.trim()) {
      setError("Ingredients cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError("");
    setRecipe("");

    const params = new URLSearchParams();
    params.append("ingredients", ingredients);
    if (cuisine.trim()) {
      params.append("cuisine", cuisine);
    } else {
      params.append("cuisine", "any");
    }
    if (dietaryRestrictions.trim()) {
      params.append("dietaryRestrictions", dietaryRestrictions);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/recipe-creator?${params.toString()}`
      );
      if (!response.ok) {
        const errorText =
          (await response.text()) || `HTTP error! status: ${response.status}`;
        throw new Error(errorText);
      }
      const data = await response.text();
      setRecipe(data);
    } catch (err) {
      console.error("Error generating recipe:", err);
      setError(err.message || "Failed to generate recipe.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error && ingredients.trim()) setError(""); 
  };

  return (
    <div className="component-card">
      <h2>Recipe Generator</h2>
      <form onSubmit={createRecipe}>
        {" "}
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (required):</label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={handleInputChange(setIngredients)}
            placeholder="e.g., chicken, tomatoes, onion"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine (optional):</label>
          <input
            id="cuisine"
            type="text"
            value={cuisine}
            onChange={handleInputChange(setCuisine)}
            placeholder="e.g., Italian, Mexican (default: any)"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dietaryRestrictions">
            Dietary Restrictions (optional):
          </label>
          <input
            id="dietaryRestrictions"
            type="text"
            value={dietaryRestrictions}
            onChange={handleInputChange(setDietaryRestrictions)}
            placeholder="e.g., vegetarian, gluten-free"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="action-button"
          disabled={isLoading || !ingredients.trim()}
        >
          {isLoading ? "Creating..." : "Generate Recipe"}
        </button>
      </form>

      {isLoading && !error && (
        <p className="loading-text">Crafting your recipe...</p>
      )}
      {error && <p className="error-message">{error}</p>}

      {recipe && (
        <div className="output-section">
          <h3>Your Recipe:</h3>
          <pre>{recipe}</pre>
        </div>
      )}
    </div>
  );
}
export default RecipeComponent;
