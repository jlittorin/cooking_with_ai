import Recipe from "../models/Recipe";
import RecipeCardContainer from "./RecipeCardContainer";

interface Props {
  onCreate: (recipe: Recipe) => void;
}

const CreateRecipeCard = ({ onCreate }: Props) => {
  return (
    <RecipeCardContainer
      onClick={() => {
        onCreate(new Recipe());
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-[192px] pb-12 select-none">+</span>
      </div>
    </RecipeCardContainer>
  );
};

export default CreateRecipeCard;
