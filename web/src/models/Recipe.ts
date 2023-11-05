import Ingredient from "./Ingredient";

class Recipe {
    id!: number;
    title!: string;
    image!: string;
    description!: string;
    ingredients!: Ingredient[];
    instructions!: Instruction[];
  }
  
class Instruction {
    step!: number;
    text!: string;
}

export default Recipe;