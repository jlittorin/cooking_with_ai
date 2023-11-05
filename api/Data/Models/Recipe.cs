namespace RecipeApi.Data.Models;

public class Recipe
{
    public int Id { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required IEnumerable<RecipeIngredient> Ingredients { get; init; }
    public required IEnumerable<RecipeInstruction> Instructions { get; init; }
}

public class RecipeIngredient
{
    public int Id { get; init; }
    public required string Name { get; init; }
    public required string Quantity { get; init; }
    public required string Unit { get; init; }
}

public class RecipeInstruction
{
    public int Id { get; init; }
    public int Step { get; init; }
    public required string Text { get; init; }
}