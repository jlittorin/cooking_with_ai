import { useState, useEffect } from "react";
import Recipes from "./assets/Recipes";
import DisplayRecipe from "./components/DisplayRecipe";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import Recipe from "./models/Recipe";
import SearchBox from "./components/SearchBox";
import CreateRecipe from "./components/CreateRecipe";
import EditRecipe from "./components/EditRecipe";

function App() {
  const [selectedRecipe, selectRecipe] = useState<Recipe | null>(null);
  const [queryString, setQueryString] = useState("");
  const [displayCreateRecipe, setDisplayCreateRecipe] = useState(false);
  const [recipeForEditing, setRecipeForEditing] = useState<Recipe | null>(null);

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
        onCreate={() => {
          setDisplayCreateRecipe(true);
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
      {displayCreateRecipe && (
        <CreateRecipe
          onCreated={(recipe) => {
            setDisplayCreateRecipe(false);
            setRecipeForEditing(recipe);
          }}
        />
      )}
      {recipeForEditing && (
        <EditRecipe
          recipe={recipeForEditing}
          onSave={(recipe) => {
            Recipes.push(recipe);
            setRecipeForEditing(null);
          }}
          onCancel={() => {
            setRecipeForEditing(null);
          }}
        />
      )}
    </>
  );
}

export default App;
