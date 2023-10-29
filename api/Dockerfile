
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build

WORKDIR /app

COPY ./ .
RUN dotnet restore RecipeApi.csproj
RUN dotnet publish --no-restore RecipeApi.csproj -c Release -o out


# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS deploy

WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 80
ENTRYPOINT ["dotnet", "RecipeApi.dll"]


