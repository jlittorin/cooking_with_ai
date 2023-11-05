import Ingredient from "../models/Ingredient";
import Recipe from "../models/Recipe";

interface Props<TValue> {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
  index: number;
  property: string;
  width: string;
}

function IngredientInput<TValue>({
  recipe,
  setRecipe,
  index,
  property,
  width,
}: Props<TValue>): JSX.Element {
  return (
    <input
      type="text"
      className={
        "w-" +
        width +
        " shadow-md bg-gray-50 rounded-md p-1 focus:outline-gray-200"
      }
      value={recipe.ingredients[index][property as keyof Ingredient] as string}
      onChange={(e) => {
        const newIngredients = recipe.ingredients.map((ingredient, i) => {
          if (i === index) {
            return { ...ingredient, [property]: e.target.value };
          }
          return ingredient;
        });
        setRecipe({ ...recipe, ingredients: newIngredients });
      }}
    />
  );
}

export default IngredientInput;
