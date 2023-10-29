using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Data;
using RecipeApi.Features.ChatGpt;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Get open AI API key from environment
var openAiKey = Environment.GetEnvironmentVariable("OPEN_AI_API_KEY");

builder.Services.AddHttpClient<ChatGptClient>(client =>
{
    client.BaseAddress = new Uri("https://api.openai.com/");
    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {openAiKey}");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

builder.Services.AddControllers(options =>
{
    options.ModelBinderProviders.Insert(0, new BinderTypeModelBinderProvider());
});

// Get db file location from appsettings
var dbFile = Environment.ExpandEnvironmentVariables(builder.Configuration.GetSection("DatabaseFile").Value);
var dbPath = Path.GetDirectoryName(dbFile);
Directory.CreateDirectory(dbPath);

var connectionString = new SqliteConnectionStringBuilder()
{
    DataSource = dbFile,
    Mode = SqliteOpenMode.ReadWriteCreate
}.ToString();

// Add the EF DbContext RecipeDbContext to the DI container
builder.Services.AddDbContext<RecipeDbContext>(options =>
{
    options.UseSqlite($"Data Source={dbFile};Cache=Shared");
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://recipe-web") // replace with your frontend container name or its IP
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

// apply database migrations
using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<RecipeDbContext>();
dbContext.Database.Migrate();
dbContext.SaveChanges();


app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
