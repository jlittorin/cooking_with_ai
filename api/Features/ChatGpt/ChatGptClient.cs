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

    public async Task<ChatGptResponse> GetRecipeAsync(string recipeText)
    {
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
        return await response.Content.ReadAsAsync<ChatGptResponse>();
    }
}
