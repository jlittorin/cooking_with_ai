using Microsoft.AspNetCore.Mvc.ModelBinding;

public class PlainTextModelBinder : IModelBinder
{
    public async Task BindModelAsync(ModelBindingContext bindingContext)
    {
        if (bindingContext == null) throw new ArgumentNullException(nameof(bindingContext));

        using var reader = new StreamReader(bindingContext.HttpContext.Request.Body);
        var value = await reader.ReadToEndAsync();

        bindingContext.Result = ModelBindingResult.Success(value.Trim());
    }
}
