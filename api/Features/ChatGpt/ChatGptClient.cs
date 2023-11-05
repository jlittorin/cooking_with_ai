using RecipeApi.Data.Models;
using RecipeApi.Features.ChatGpt.Models;
using System.Text.Json;

namespace RecipeApi.Features.ChatGpt;


public class ChatGptClient
{
    private readonly HttpClient _httpClient;

    private const string systemMessage = """
You are to convert every user input into a recipe. The returned recipe should be in the following JSON format:

{
   "title": "dish name",
   "description": "dish description",
   "ingredients": [    
     {"quantity": quantityt_1, "unit": "unit_1", "name": "ingredient_1"},
     {"quantity": quantityt_2, "unit": "unit_2", "name": "ingredient_2"},
     ...
   ],
   "instructions": [
     "instruction 1",
     "instruction 2",
     ...
   ]
}

Ingredients should be composed of the quantity (use 0 if not mentioned), unit used (could be "pcs" if no other unit is mentioned, otherwise use an empty string), and ingredient name. 

Instruction steps don't need to be prepended with any step number.

Only return this JSON formatted data. 
""";

    private const string gpt35 = "gpt-3.5-turbo-instruct";
    private const string gpt4 = "gpt-4-0613";


    public ChatGptClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Recipe> GetRecipeAsync(string recipeText)
    {
#if USE_GPT
        var query = new ChatGptQuery(gpt4, new [] {
            new ChatGptQueryMessage("system", systemMessage),
            new ChatGptQueryMessage("user", recipeText),
            });

        var queryJson = JsonSerializer.Serialize(query);

        var response = await _httpClient.PostAsJsonAsync("v1/chat/completions", query);
        if (response.StatusCode != System.Net.HttpStatusCode.OK)
        {
            var message = response.Content.ReadAsStringAsync();
            throw new Exception(message.Result);
        }
        response.EnsureSuccessStatusCode();
        
        var chatGptResponse = await response.Content.ReadAsAsync<ChatGptResponse>();

        var recipeJsonString = chatGptResponse.choices.FirstOrDefault()?.message.content;
#else
        var recipeJsonString = RecipeSample;
#endif

        return  JsonSerializer.Deserialize<Recipe>(recipeJsonString, new JsonSerializerOptions() { });

    }

    private const string RecipeSample = """
        {
          "Id": 1,
          "Title": "Classic Tomato Spaghetti",
          "Description": "This is a classic tomato spaghetti recipe that is simple to make and perfect for a quick and easy meal.",
          "Ingredients": [
            {
              "Id": 101,
              "Name": "Spaghetti",
              "Quantity": "500",
              "Unit": "grams"
            },
            {
              "Id": 102,
              "Name": "Olive oil",
              "Quantity": "2",
              "Unit": "tablespoons"
            },
            {
              "Id": 103,
              "Name": "Garlic",
              "Quantity": "2",
              "Unit": "cloves"
            },
            {
              "Id": 104,
              "Name": "Ripe tomatoes",
              "Quantity": "5",
              "Unit": "units"
            },
            {
              "Id": 105,
              "Name": "Basil",
              "Quantity": "1",
              "Unit": "handful"
            }
          ],
          "Instructions": [
            {
              "Id": 201,
              "Step": 1,
              "Text": "Boil the spaghetti in salted water according to the package instructions."
            },
            {
              "Id": 202,
              "Step": 2,
              "Text": "Heat the olive oil and add finely chopped garlic."
            },
            {
              "Id": 203,
              "Step": 3,
              "Text": "Chop the tomatoes and add them to the pan, cooking until soft."
            },
            {
              "Id": 204,
              "Step": 4,
              "Text": "Drain the spaghetti and combine with the tomato sauce."
            },
            {
              "Id": 205,
              "Step": 5,
              "Text": "Garnish with basil and serve hot."
            }
          ]
        }
        
""";
}
