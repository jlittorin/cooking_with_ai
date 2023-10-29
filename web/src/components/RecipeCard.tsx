import LimitedText from "./LimitedText";
import Recipe from "../models/Recipe";
import RecipeCardContainer from "./RecipeCardContainer";

interface Props {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onSelect }: Props) => {
  const { title, image, description } = recipe;

  return (
    <RecipeCardContainer
      onClick={() => {
        onSelect(recipe);
      }}
    >
      <h1 className="text-2xl py-2">{title}</h1>
      <img className="w-[355px] h-[245px] object-cover" src={image} />
      <p className="text-gray-600 my-3 border-l-2 pl-4 text-xs italic">
        <LimitedText length={300}>{description}</LimitedText>
      </p>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
