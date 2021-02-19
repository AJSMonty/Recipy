import React, { useState, useEffect, useMemo, cloneElement } from "react";

const RecipeList = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`http://localhost:8080/api/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setRecipes(result);
        console.log("Success:", result);
      });
  };

  useEffect(getRecipes, []);

  // Good for performance as it only recalculates upon dependency changes
  const filteredRecipes = useMemo(() => {
    // Return the original list of recipes if no ingredients are selected
    if (!selectedIngredients.length) return recipes;
    // Loop through the recipes
    const filteredRecipes = recipes.reduce((all, recipe) => {
      // Because recipe.ingredients is an array we also have to loop through that
      // in this case we're using find
      const doesIngredientExist = recipe.ingredients.find((item) => {
        // Loop through the checked ingredients and if ONE of the values of recipe.ingredients includes the selected ingredient key (e.g onion) then return true
        const checkedIngredients = selectedIngredients.find((selectedItem) => {
          return item.includes(selectedItem.toLowerCase());
        });
        return checkedIngredients;
      });
      // If this is true then add it to the list
      if (doesIngredientExist) {
        return [...all, recipe];
      }
      // If the ingredient doesn't exist at all within recipe.ingredients then just return what we've got
      return all;
    }, []);
    return filteredRecipes;
  }, [selectedIngredients, recipes]);

  return (
    <>
      <>
        {filteredRecipes.map((recipe) => {
          return (
            <>
              <img src={recipe.image}></img>
              <h2>NAME</h2>
              <p> {recipe.name}</p>
              <h2>INGREDIENTS</h2>
              {recipe.ingredients.map((ing) => {
                return (
                  <>
                    <li>{ing}</li>
                  </>
                );
              })}
              <h2>INSTRUCTIONS</h2>
              {recipe.instructions.map((steps) => {
                return (
                  <ul>
                    <li>{steps}</li>
                  </ul>
                );
              })}
              <h2>Time</h2>
              <p>Cook: {recipe.time.cook}</p>
              <p>Prep: {recipe.time.prep}</p>
            </>
          );
        })}
      </>
    </>
  );
};

export default RecipeList;
