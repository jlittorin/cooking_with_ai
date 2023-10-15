import CreateRecipeCard from "./CreateRecipeCard";
import Recipe from "../models/Recipe";
import RecipeCard from "./RecipeCard";

interface Props {
  recipes: Recipe[];
  onCreate: (recipe: Recipe) => void;
  onSelect: (recipe: Recipe) => void;
}

const RecipeList = ({ recipes, onCreate, onSelect }: Props) => {
  return (
    <div className="flex flex-row flex-wrap">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          onSelect={() => {
            onSelect(recipe);
          }}
        />
      ))}
      <CreateRecipeCard onCreate={onCreate} />
    </div>
  );
};

export default RecipeList;
