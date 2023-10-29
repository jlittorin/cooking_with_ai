namespace RecipeApi.Features.ChatGpt.Models
{
    public record ChatGptQuery(string model, IEnumerable<ChatGptQueryMessage> messages);
    public record ChatGptQueryMessage(string role, string content);
}