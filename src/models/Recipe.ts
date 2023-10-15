import Ingredient from "./Ingredient";

class Recipe {
    title!: string;
    image!: string;
    description!: string;
    ingredients!: Ingredient[];
    instructions!: string[];
  }
  

export default Recipe;