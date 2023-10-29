import CreateRecipeCard from "./CreateRecipeCard";
import Recipe from "../models/Recipe";
import RecipeCard from "./RecipeCard";

interface Props {
  recipes: Recipe[];
  query: string;
  onCreate: (recipe: Recipe) => void;
  onSelect: (recipe: Recipe) => void;
}

const RecipeList = ({ recipes, query, onCreate, onSelect }: Props) => {
  const matches = (query: string, recipe: Recipe) => {
    const queryWords = query
      .split(/\s+/)
      .filter((q) => q.length > 2)
      .map((q) => q.toLocaleLowerCase());

    let match = true;
    queryWords.forEach((queryWord: string) => {
      let wordMatch = false;
      recipe.ingredients.forEach((ingredient) => {
        const m = ingredient.name.toLocaleLowerCase().includes(queryWord);
        wordMatch ||= m;
      });
      wordMatch ||= recipe.title.toLocaleLowerCase().includes(queryWord);
      match &&= wordMatch;
    });
    return match;
  };

  return (
    <div className="flex flex-wrap">
      {recipes.map(
        (recipe, index) =>
          (query == "" || matches(query, recipe)) && (
            <RecipeCard
              key={index}
              recipe={recipe}
              onSelect={() => {
                onSelect(recipe);
              }}
            />
          )
      )}
      {!query && <CreateRecipeCard onCreate={onCreate} />}
    </div>
  );
};

export default RecipeList;
