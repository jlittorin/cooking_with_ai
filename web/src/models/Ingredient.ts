interface Ingredient  {
  quantity: string | number; // Allows flexibility for different measurement units
  unit: string;
  name: string;
}

export default Ingredient;