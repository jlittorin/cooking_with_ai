import { useEffect, useRef, useState } from "react";
import Recipe from "../models/Recipe";
import ClipLoader from "react-spinners/ClipLoader";
import { TfiTrash, TfiPlus } from "react-icons/tfi";
import IngredientInput from "./IngredientInput";

interface Props {
  onClose: (recipe: Recipe | null) => void;
}

type State = "enterBodyText" | "submittingRecipeBody" | "editingRecipe";

const CreateRecipe = ({ onClose }: Props) => {
  const [state, setState] = useState<State>("enterBodyText");

  const defaultRecipe = new Recipe();
  defaultRecipe.title = "New Recipe";
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);
  const [recipeBody, setRecipeBody] = useState<string>("");
  const [addingIngredient, setAddingIngredient] = useState<boolean>(false);

  const setIngredient = (index: number, property: string, value: number) => {
    const newIngredients = recipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [property]: value };
      }
      return ingredient;
    });
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const endOfScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (!addingIngredient) return;
      endOfScreenRef.current?.scrollIntoView({ behavior: "smooth" });
      setAddingIngredient(false);
    };

    scrollToBottom();
  }, [recipe.instructions, addingIngredient]);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click was directly on the outer div
    if (e.target === e.currentTarget) {
      onClose(null);
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
        setRecipe(recipe);
        setState("editingRecipe");
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
        <h1 className="text-4xl py-4">{recipe.title}</h1>

        {state == "enterBodyText" && (
          <span>
            <label htmlFor="recipe_body" className="text-sm text-gray-500">
              Recipe Body
            </label>
            <textarea
              id="recipe_body"
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

        {state == "editingRecipe" && (
          <div>
            <textarea
              className="my-4 border-l-2 pl-4 pr-8 text-sm italic w-full"
              value={recipe.description}
            ></textarea>

            <h2 className="text-xl py-4">Ingredients</h2>
            <table className="w-full table-auto">
              {recipe.ingredients.map((_, index) => (
                <tr key={"ingredient" + index}>
                  <td className="whitespace-nowrap">
                    <IngredientInput
                      array={recipe.ingredients}
                      setItem={setIngredient}
                      index={index}
                      property="quantity"
                      width="10"
                    ></IngredientInput>
                  </td>
                  <td className="whitespace-nowrap">
                    <IngredientInput
                      array={recipe.ingredients}
                      setItem={setIngredient}
                      index={index}
                      property="unit"
                      width="40"
                    ></IngredientInput>
                  </td>
                  <td className="w-full">
                    <IngredientInput
                      array={recipe.ingredients}
                      setItem={setIngredient}
                      index={index}
                      property="name"
                      width="full"
                    ></IngredientInput>
                  </td>

                  <td className="w-auto">
                    <span
                      onClick={() => {
                        const newIngredients = recipe.ingredients.filter(
                          (_, i) => i !== index
                        );
                        setRecipe({ ...recipe, ingredients: newIngredients });
                      }}
                      className="w-4 h-4"
                    >
                      <TfiTrash className="ml-4 w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>
                  <button className="w-10 h-10 shadow-md bg-gray-50 rounded-md p-3 hover:bg-gray-100 hover:shadow-lg">
                    <TfiPlus
                      onClick={() => {
                        const newIngredients = recipe.ingredients.concat({
                          quantity: "",
                          unit: "",
                          name: "",
                        });
                        setRecipe({ ...recipe, ingredients: newIngredients });
                      }}
                    />
                  </button>
                </td>
              </tr>
            </table>

            <h2 className="text-xl pt-8 pb-4">Instructions</h2>
            <table className="w-full">
              {recipe.instructions.map((instruction, index) => (
                <tr key={"instruction" + index} className="flex py-2">
                  <td className="w-8">
                    <span className="font-semibold pr-4">
                      {instruction.step + 5}
                    </span>
                  </td>
                  <td className="flex w-full">
                    <textarea
                      className="flex w-full pr-16 shadow-md bg-gray-50 rounded-md p-1"
                      value={instruction.text}
                      onChange={(e) => {
                        const newInstructions = recipe.instructions.map(
                          (instruction, i) => {
                            if (i === index) {
                              return { ...instruction, text: e.target.value };
                            }
                            return instruction;
                          }
                        );
                        setRecipe({
                          ...recipe,
                          instructions: newInstructions,
                        });
                      }}
                    ></textarea>
                  </td>
                  <td className="w-auto">
                    <span
                      onClick={() => {
                        const newInstructions = recipe.instructions.filter(
                          (_, i) => i !== index
                        );
                        setRecipe({ ...recipe, instructions: newInstructions });
                      }}
                      className="w-4 h-4"
                    >
                      <TfiTrash className="ml-4 w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="flex py-2">
                <td className="w-8"></td>
                <td className="flex w-auto">
                  <button className="w-10 h-10 shadow-md bg-gray-50 rounded-md p-3 hover:bg-gray-100 hover:shadow-lg">
                    <TfiPlus
                      onClick={() => {
                        const newInstructions = recipe.instructions.concat({
                          step: recipe.instructions.length + 1,
                          text: "",
                        });
                        setRecipe({ ...recipe, instructions: newInstructions });
                        setAddingIngredient(true);
                      }}
                    />
                  </button>
                </td>
              </tr>
            </table>
            <button className="mt-10 shadow-md bg-green-900 text-white rounded-md p-3 hover:bg-green-800 hover:shadow-lg">
              Save
            </button>
            <button
              ref={endOfScreenRef}
              className="mt-10 ml-2 shadow-md bg-red-900 text-white rounded-md p-3 hover:bg-red-800 hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRecipe;
