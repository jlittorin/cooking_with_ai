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
  const [recipes, setRecipes] = useState<Recipe[]>(Recipes);

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
        recipes={recipes}
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
          onEdit={() => {
            selectRecipe(null);
            setRecipeForEditing(selectedRecipe);
          }}
          onClose={() => {
            selectRecipe(null);
          }}
        />
      )}
      {displayCreateRecipe && (
        <CreateRecipe
          onCreated={(recipe) => {
            setDisplayCreateRecipe(false);
            if (recipe) {
              const newRecipes = [...recipes, recipe];
              setRecipes(newRecipes);
              setRecipeForEditing(recipe);
            }
          }}
        />
      )}
      {recipeForEditing && (
        <EditRecipe
          recipe={recipeForEditing}
          onSave={(recipe, image) => {
            recipe.image = image ? URL.createObjectURL(image) : "";
            const index = recipes.findIndex((r) => r.id === recipe.id);
            if (index !== -1) {
              const newRecipes = [...recipes];
              newRecipes[index] = recipe;
              setRecipes(newRecipes);
            }

            setRecipeForEditing(null);
          }}
          onCancel={() => {
            setRecipeForEditing(null);
          }}
          onDelete={() => {
            const index = recipes.findIndex(
              (recipe) => recipe.id === recipeForEditing.id
            );
            if (index !== -1) {
              const newRecipes = [...recipes];
              newRecipes.splice(index, 1);
              setRecipes(newRecipes);
            }
            setRecipeForEditing(null);
          }}
        />
      )}
    </>
  );
}

export default App;
