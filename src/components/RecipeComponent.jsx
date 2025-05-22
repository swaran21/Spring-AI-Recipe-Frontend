import React, { useState } from "react";

function RecipeComponent(){
    const [ingredients,setIngredients] = useState('');
    const [cuisne,setCuisine] = useState('any');
    const [dietaryRestrictions,setDietaryRestrictions] = useState('');
    const [recipe,setRecipe] = useState('');

    const createRecipe = async()=>{
        try {
            const respone = await fetch(`http://localhost:8080/recipe-creator?ingredients=${ingredients}&dietaryRestrictions=${dietaryRestrictions}&cuisine=${cuisne}`)
            const data = await respone.text();
            console.log(data);
            setRecipe(data);

        } catch (error) {
            console.error("Error generating recipe :",error)
        }
    }

    return(
        <div>
            <h2>Create a Recipe</h2>
            <input
                type="text"
                value={ingredients}
                onChange={(e)=>setIngredients(e.target.value)}
                placeholder="Enter ingredients"
                />
            <input
                type="text"
                value={cuisne}
                onChange={(e)=>setCuisine(e.target.value)}
                placeholder="Enter Cuisine type"
                />
            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e)=>setDietaryRestrictions(e.target.value)}
                placeholder="Enter dietary Restrictions"
                />
            <button onClick={createRecipe}>Create Recipe</button>
            <div className="output">
                <pre className="recipe-text">{recipe}</pre>
            </div>
        </div>
    );
}
export default RecipeComponent;