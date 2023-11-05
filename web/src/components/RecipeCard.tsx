import LimitedText from "./LimitedText";
import Recipe from "../models/Recipe";
import RecipeCardContainer from "./RecipeCardContainer";
import { Tooltip } from "react-tooltip";

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
      <h1
        data-tooltip-id={"recipe-title-" + recipe.id}
        data-tooltip-content={recipe.title}
        data-tooltip-delay-show={500}
        className="text-2xl py-2 overflow-hidden whitespace-nowrap"
      >
        {title}
      </h1>
      <Tooltip id={"recipe-title-" + recipe.id} />
      <img className="w-[355px] h-[245px] object-cover" src={image} />
      <p className="text-gray-600 my-3 border-l-2 pl-4 text-xs italic">
        <LimitedText length={300}>{description}</LimitedText>
      </p>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
