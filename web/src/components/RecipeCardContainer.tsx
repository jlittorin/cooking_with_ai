import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const RecipeCardContainer = ({ children, onClick }: Props) => {
  return (
    <div
      className="w-[390px] h-[425px] items-center overflow-clip bg-white shadow-md rounded-xl p-4 m-4 hover:cursor-pointer hover:shadow-2xl hover:scale-[1.01] duration-200"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default RecipeCardContainer;
