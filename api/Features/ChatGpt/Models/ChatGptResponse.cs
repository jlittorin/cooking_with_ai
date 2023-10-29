namespace RecipeApi.Features.ChatGpt.Models
{
    public record ChatGptResponse(string id, IEnumerable<ChatGptResponseChoice> choices);

    public record ChatGptResponseChoice(int index, ChatGptResponseChoiceMessage message);
    
    public record ChatGptResponseChoiceMessage(string role, string content);
}