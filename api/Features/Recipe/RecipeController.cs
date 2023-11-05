
// C# API controller boilerplate
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Data;
using RecipeApi.Data.Models;
using RecipeApi.Features.ChatGpt;
using System.Text.Json;

[Route("api/[controller]")]
[ApiController]
public class RecipeController : ControllerBase
{

    private readonly RecipeDbContext _recipeDbContext;
    private readonly ChatGptClient _chatGptClient;

    public RecipeController(RecipeDbContext recipeStore, ChatGptClient chatGptClient)
    {
        _recipeDbContext = recipeStore;
        _chatGptClient = chatGptClient;
    }

    [HttpGet("{id}")]
    public ActionResult<Recipe> Get([FromRoute] int id)
    {
        var recipe = _recipeDbContext.Recipes.Find(id);

        return recipe == null
            ? NotFound()
            : Ok(recipe);
    }


    [HttpPost("fromtext")]
    public async Task<ActionResult<Recipe>> Get([FromBody][ModelBinder(BinderType = typeof(PlainTextModelBinder))] string text)
    {
        if (text == "")
        {
            return new Recipe()
            {
                Title = "",
                Description = "",
                Ingredients = new List<RecipeIngredient>(),
                Instructions = new List<RecipeInstruction>(),
            };
        }
        var recipe = await _chatGptClient.GetRecipeAsync(text);

        return recipe == null
            ? NotFound()
            : Ok(recipe);
    }
}
