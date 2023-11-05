import { useState } from "react";
import Recipe from "../models/Recipe";
import ClipLoader from "react-spinners/ClipLoader";
import { GetNextRecipeId } from "../assets/Recipes";

interface Props {
  onCreated: (recipe: Recipe | null) => void;
}

type State = "enterBodyText" | "submittingRecipeBody";

const CreateRecipe = ({ onCreated }: Props) => {
  const [state, setState] = useState<State>("enterBodyText");

  const defaultRecipe = new Recipe();
  defaultRecipe.title = "New Recipe";
  const [recipeBody, setRecipeBody] = useState<string>("");

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click was directly on the outer div
    if (e.target === e.currentTarget) {
      onCreated(null);
    }
  };

  const handleSubmitRecipeBody = async () => {
    // Post text to the enpoint http://recipe-api/v1/recipe/fromtext to create the recipe
    // Then call onClose() to close the modal

    setState("submittingRecipeBody");

    try {
      const response = await fetch(
        "http://localhost:5130/api/recipe/fromtext",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: recipeBody,
        }
      );

      if (response.status == 200) {
        const recipe: Recipe = (await response.json()) as Recipe;
        recipe.id = GetNextRecipeId();
        onCreated(recipe);
      } else {
        setState("enterBodyText");
      }
    } catch (e) {
      console.error(e);
      setState("enterBodyText");
    }
  };

  return (
    <div
      className="fixed flex justify-center inset-0 backdrop-blur-md bg-black/50"
      onClick={handleScreenClick}
    >
      <div className="w-[800px] my-4 p-4 h-auto overflow-y-auto shadow-2xl bg-white rounded-xl">
        <h1 className="text-4xl py-4">New Recipe</h1>

        {state == "enterBodyText" && (
          <span>
            <label htmlFor="recipe_body" className="text-sm text-gray-500">
              Recipe
            </label>
            <textarea
              id="recipe_body"
              placeholder="Enter recipe text here"
              rows={10}
              className="flex p-4 w-full bg-white shadow-md rounded"
              onChange={(e) => {
                setRecipeBody(e.target.value);
              }}
            />

            <button
              onClick={() => {
                void handleSubmitRecipeBody();
              }}
              className="bg-black text-white rounded-md px-4 py-2 mt-4"
            >
              Create
            </button>
          </span>
        )}

        {state == "submittingRecipeBody" && (
          // clip loader centered in the middle of the screen
          <div className="h-auto w-full">
            <p className="text-center text-2xl text-gray-500">
              Creating recipe...
            </p>
            <div className="flex justify-center pt-12">
              <ClipLoader color="#6B7280" size={100} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRecipe;
