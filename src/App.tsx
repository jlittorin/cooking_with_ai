import { useState, useEffect } from "react";
import Recipes from "./assets/Recipes";
import DisplayRecipe from "./components/DisplayRecipe";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import Recipe from "./models/Recipe";

function App() {
  const [selectedRecipe, selectRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedRecipe != null ? "hidden" : "";
  }, [selectedRecipe]);

  return (
    <>
      <Navbar />
      <RecipeList
        recipes={Recipes}
        onSelect={(recipe) => {
          selectRecipe(recipe);
        }}
        onCreate={(recipe) => {
          Recipes.concat(recipe);
        }}
      />
      {selectedRecipe != null && (
        <DisplayRecipe
          recipe={selectedRecipe}
          onClose={() => {
            selectRecipe(null);
          }}
        />
      )}
    </>
  );
}

export default App;
