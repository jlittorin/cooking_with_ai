import Ingredient from "../models/Ingredient";

interface Props<TValue> {
  array: Ingredient[];
  setItem: (index: number, property: string, value: TValue) => void;
  index: number;
  property: string;
  width: string;
}

function IngredientInput<TValue>({
  array,
  setItem,
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
      value={array[index][property as keyof Ingredient] as string}
      onChange={(e) => {
        setItem(index, property, e.target.value as TValue);
      }}
    />
  );
}

export default IngredientInput;
