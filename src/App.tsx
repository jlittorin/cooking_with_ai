import { useState, useEffect } from "react";
import Recipes from "./assets/Recipes";
import DisplayRecipe from "./components/DisplayRecipe";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import Recipe from "./models/Recipe";
import SearchBox from "./components/SearchBox";

function App() {
  const [selectedRecipe, selectRecipe] = useState<Recipe | null>(null);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    document.body.style.overflow = selectedRecipe != null ? "hidden" : "";
  }, [selectedRecipe]);

  return (
    <>
      <Navbar />
      <SearchBox
        delay={500}
        onChange={(q) => {
          setQueryString(q);
        }}
      />
      <RecipeList
        recipes={Recipes}
        query={queryString}
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
