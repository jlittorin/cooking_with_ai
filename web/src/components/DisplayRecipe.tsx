import Recipe from "../models/Recipe";

interface Props {
  recipe: Recipe;
  onClose: () => void;
}

const DisplayRecipe = ({ recipe, onClose }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click was directly on the outer div
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed flex justify-center inset-0 backdrop-blur-md bg-black/50"
      onClick={handleClick}
    >
      <div className="w-[800px] my-4 p-4 h-auto overflow-y-auto shadow-2xl bg-white rounded-xl">
        <h1 className="text-4xl py-4">{recipe.title}</h1>

        <img className="w-[792px] object-cover" src={recipe.image} />

        <p className="my-4 border-l-2 pl-4 pr-8 text-sm italic">
          {recipe.description}
        </p>

        <h2 className="text-xl py-4">Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className={"py-2 border-b " + (index == 0 ? "border-t" : "")}
            >
              <span className="italic">
                {ingredient.quantity
                  ? ingredient.unit
                    ? ingredient.quantity + " " + ingredient.unit + " "
                    : ingredient.quantity + " "
                  : ""}
              </span>
              <span>{ingredient.name}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl pt-8 pb-4">Instructions</h2>
        <ol>
          {recipe.instructions.map((instruction) => (
            <li key={"instruction" + instruction.step} className="flex py-2">
              <p className="font-semibold pr-4">{instruction.step}.</p>
              <p className="pr-16">{instruction.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default DisplayRecipe;
