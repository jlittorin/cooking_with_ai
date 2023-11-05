import { useEffect, useRef, useState } from "react";
import Recipe from "../models/Recipe";
import IngredientInput from "./IngredientInput";
import { TfiPlus, TfiTrash } from "react-icons/tfi";
import ImageUploader from "./ImageUploader";

interface Props {
  recipe: Recipe;
  onSave(recipe: Recipe, image: File | null): void;
  onCancel(): void;
  onDelete(): void;
}

const EditRecipe = ({ recipe, onSave, onCancel, onDelete }: Props) => {
  const [editedRecipe, setRecipe] = useState<Recipe>(recipe);
  const [addingIngredient, setAddingIngredient] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const setIngredient = (index: number, property: string, value: number) => {
    const newIngredients = recipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [property]: value };
      }
      return ingredient;
    });
    setRecipe({ ...editedRecipe, ingredients: newIngredients });
  };

  const endOfScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (!addingIngredient) return;
      endOfScreenRef.current?.scrollIntoView({ behavior: "smooth" });
      setAddingIngredient(false);
    };

    scrollToBottom();
  }, [editedRecipe.instructions, addingIngredient]);

  return (
    <div className="fixed flex justify-center inset-0 backdrop-blur-md bg-black/60">
      <div className="w-[800px] my-4 p-4 h-auto overflow-y-auto shadow-2xl bg-white rounded-xl">
        <div className="w-full">
          <input
            placeholder="Recipe Title"
            type="text"
            className="text-4xl py-4 focus:outline-gray-200 focus:bg-gray-50 w-full"
            value={editedRecipe.title}
            onChange={(e) => {
              setRecipe({ ...editedRecipe, title: e.target.value });
            }}
          />
        </div>

        <ImageUploader
          id="recipe_image"
          className="mt-4"
          image={editedRecipe.image}
          onImageChanged={(image) => {
            setImage(image);
          }}
        />
        <div>
          <label htmlFor="recipe_description" className="text-sm text-gray-500">
            Recipe Description
          </label>
          <textarea
            id="recipe_description"
            rows={5}
            placeholder="Recipe Description"
            className="my-4 border-l-2 pl-4 pr-8 text-sm italic w-full focus:outline-gray-200 focus:bg-gray-50"
            value={editedRecipe.description}
            onChange={(e) => {
              setRecipe({ ...editedRecipe, description: e.target.value });
            }}
          ></textarea>

          <h2 className="text-xl py-4">Ingredients</h2>
          <table className="w-full table-auto">
            {editedRecipe.ingredients.map((_, index) => (
              <tr key={"ingredient" + index}>
                <td className="whitespace-nowrap">
                  <IngredientInput
                    array={editedRecipe.ingredients}
                    setItem={setIngredient}
                    index={index}
                    property="quantity"
                    width="10"
                  ></IngredientInput>
                </td>

                <td className="whitespace-nowrap">
                  <IngredientInput
                    array={editedRecipe.ingredients}
                    setItem={setIngredient}
                    index={index}
                    property="unit"
                    width="40"
                  ></IngredientInput>
                </td>

                <td className="w-full">
                  <IngredientInput
                    array={editedRecipe.ingredients}
                    setItem={setIngredient}
                    index={index}
                    property="name"
                    width="full"
                  ></IngredientInput>
                </td>

                <td className="w-auto">
                  <button
                    onClick={() => {
                      const newIngredients = editedRecipe.ingredients.filter(
                        (_, i) => i !== index
                      );
                      setRecipe({
                        ...editedRecipe,
                        ingredients: newIngredients,
                      });
                    }}
                    className="w-4 h-4 ml-2"
                  >
                    <TfiTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}>
                <button
                  className="w-10 h-10 shadow-md bg-gray-50 rounded-md p-3 hover:bg-gray-100 hover:shadow-lg"
                  onClick={() => {
                    const newIngredients = editedRecipe.ingredients.concat({
                      quantity: "",
                      unit: "",
                      name: "",
                    });
                    setRecipe({
                      ...editedRecipe,
                      ingredients: newIngredients,
                    });
                  }}
                >
                  <TfiPlus />
                </button>
              </td>
            </tr>
          </table>

          <h2 className="text-xl pt-8 pb-4">Instructions</h2>

          <table className="w-full">
            {editedRecipe.instructions.map((instruction, index) => (
              <tr key={"instruction" + index} className="flex py-2">
                <td className="w-8">
                  <span className="font-semibold pr-4">{instruction.step}</span>
                </td>

                <td className="flex w-full">
                  <textarea
                    rows={3}
                    className="flex w-full pr-16 shadow-md bg-gray-50 rounded-md p-1 focus:outline-gray-200"
                    value={instruction.text}
                    onChange={(e) => {
                      const newInstructions = editedRecipe.instructions.map(
                        (instruction, i) => {
                          if (i === index) {
                            return { ...instruction, text: e.target.value };
                          }
                          return instruction;
                        }
                      );
                      setRecipe({
                        ...editedRecipe,
                        instructions: newInstructions,
                      });
                    }}
                  ></textarea>
                </td>

                <td className="w-auto">
                  <button
                    onClick={() => {
                      const newInstructions = editedRecipe.instructions.filter(
                        (_, i) => i !== index
                      );
                      setRecipe({
                        ...editedRecipe,
                        instructions: newInstructions,
                      });
                    }}
                    className="w-4 h-4 ml-2"
                  >
                    <TfiTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            <tr className="flex py-2">
              <td className="w-8"></td>

              <td className="flex w-auto">
                <button
                  className="w-10 h-10 shadow-md bg-gray-50 rounded-md p-3 hover:bg-gray-100 hover:shadow-lg"
                  onClick={() => {
                    const newInstructions = editedRecipe.instructions.concat({
                      step: editedRecipe.instructions.length + 1,
                      text: "",
                    });
                    setRecipe({
                      ...editedRecipe,
                      instructions: newInstructions,
                    });
                    setAddingIngredient(true);
                  }}
                >
                  <TfiPlus />
                </button>
              </td>
            </tr>
          </table>

          <div
            ref={endOfScreenRef}
            className="flex justify-between items-center mt-10"
          >
            <button
              className="shadow-md bg-green-900 text-white rounded-md p-3 hover:bg-green-800 hover:shadow-lg"
              onClick={() => {
                onSave(editedRecipe, image);
              }}
            >
              Save
            </button>

            <button
              className="ml-2 shadow-md bg-red-900 text-white rounded-md p-3 hover:bg-red-800 hover:shadow-lg"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </button>

            <div className="flex justify-end w-full"></div>

            <button className="">
              <TfiTrash
                className="w-8 h-8 text-gray-400"
                onClick={() => {
                  onDelete();
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
