import Recipe from '../models/Recipe'

let NextRecipeId = 5;
export const GetNextRecipeId = () => {
  return NextRecipeId++;
}

export const recipes: Recipe[] = [
    {
      id: 1,
      title: "Fancy Food",
      image: "https://unsplash.com/photos/-YHSwy6uqvk/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk3MzE1NzUzfA&force=true&w=792",
      description:
        "Crispy quinoa patties topped with delicate quail eggs, succulent slices of meat garnished with vibrant red chilies and fresh herbs, and a nutty sprinkle surrounding a luscious lettuce wrap — all paired with a savory dipping sauce. An exquisite array of textures and flavors to delight the palate.",
        ingredients: [
          { quantity: 2, unit: "cups", name: "cooked quinoa" },
          { quantity: 1, unit: "", name: "small onion, finely chopped" },
          { quantity: 0.5, unit: "cup", name: "breadcrumbs" },
          { quantity: 2, unit: "", name: "large eggs" },
          { quantity: 0.5, unit: "tsp", name: "salt" },
          { quantity: 0.25, unit: "tsp", name: "black pepper" },
          { quantity: 0.5, unit: "cup", name: "grated Parmesan cheese" },
          { quantity: 2, unit: "tbsp", name: "chopped fresh parsley" },
          { quantity: 4, unit: "", name: "quail eggs" },
          { quantity: 3, unit: "tbsp", name: "olive oil" }
        ],
        instructions: [
          { step: 1, text: "In a mixing bowl, combine the cooked quinoa, chopped onion, breadcrumbs, eggs, salt, pepper, Parmesan cheese, and chopped parsley. Mix all ingredients until they are well combined."},
          { step: 2, text: "Form small patties using your hands. Ensure that each patty is compact to prevent it from falling apart while frying."},
          { step: 3, text: "In a non-stick skillet, heat 2 tbsp of olive oil over medium heat. Add the quinoa patties and cook for 4-5 minutes on each side or until they are golden brown and crispy. Remove them from the skillet and set aside."},
          { step: 4, text: "In the same skillet, add the remaining tablespoon of olive oil. Carefully crack the quail eggs into the skillet. Cook for 2-3 minutes until the whites are set but the yolks remain runny. You may cover the skillet with a lid for the last minute to ensure the top of the eggs are set."},
          { step: 5, text: "Place the fried quail eggs on top of the quinoa patties. Season with additional salt and pepper if desired. Serve immediately and enjoy your crispy quinoa patties topped with delicate quail eggs!"},
        ]
    },
    {
      id: 2,
      title: "Huevos a la Flamenca",
      image: "huevos_a_la_flamenca.jpg",
      description: "Indulge in the rich and flavorful Spanish cuisine with this classic Huevos a la Flamenca recipe! A delightful blend of tomatoes, onions, peas, potatoes, and meats, simmered to perfection and crowned with a perfectly baked egg. The spicy chorizo and delicate Serrano ham intertwine with the vibrant vegetables, creating a hearty, satisfying dish that promises to transport your taste buds straight to the heart of Spain. Whether it's brunch or dinner, Huevos a la Flamenca is a timeless dish that will enchant any palate.",
        ingredients: [
          { quantity: 1, unit: "kg", name: "ripe tomatoes" },
          { quantity: 160, unit: "g", name: "onion" },
          { quantity: 200, unit: "g", name: "peas" },
          { quantity: 750, unit: "g", name: "potatoes" },
          { quantity: 6, unit: "slices", name: "Serrano ham" },
          { quantity: 50, unit: "g", name: "chorizo" },
          { quantity: 2, unit: "", name: "red peppers" },
          { quantity: 4, unit: "", name: "eggs" },
          { quantity: 5, unit: "tbsp", name: "olive oil" },
        ],
        instructions: [
          { step: 1, text: "We put oil to heat in a frying pan. When it is hot enough, fry 2 slices of ham cutted into 4 pieces. Set them aside in the heat."},
          { step: 2, text: "In the same pan, add 8 pieces of chorizo of a centimeter of size and after having removed their skin, set them aside with the ham."},
          { step: 3, text: "We begin cooking the tomato. To do this, we cut the onion in very thin slices and add them to the pan where we fried the ham and the chorizo (if there is little oil left, we add more). Cook it over a medium heat for about 10 minutes, depending on the thickness of the onion. We add the tomato, of which we have previously removed the skin and cutted into small pieces. Let it cook for about 15 minutes."},
          { step: 4, text: "On another pan we will make the fries. We peel and cut the potatoes into small squares, and we will put them in a pan with very hot oil. We will remove them when they turn golden brown."},
          { step: 5, text: "After 10 minutes of the tomatoes, include peas, pepper (chopped) and the rest of the ham and chorizo, and let simmer for a few minutes."},
          { step: 6, text: "Finally, once drained the fries, add them to the mixture for two minutes so that all ingredients are mixed together well and acquire flavor. Remove from the fire."},
          { step: 7, text: "Now we will divide the mixture on 4 plates of clay and include an egg in each of them. Put everything in the oven until the yolk is set."},
        ]
    },
    {
      id: 3,
      title: "Fläskpannkaka",
      image: "flaskpannkaka.jpg",
      description: "A traditional Swedish dish, Fläskpannkaka is a scrumptious oven pancake with pork.",
      ingredients: [
        { quantity: 1, unit: "l", name: "mjölk" },
        { quantity: 5, unit: "dl", name: "vetemjöl" },
        { quantity: 1, unit: "tsk", name: "salt" },
        { quantity: 5, unit: "", name: "ägg" },
        { quantity: 300, unit: "g", name: "fläskkött eller bacon" }
      ],
      instructions: [
        { step: 1, text: "Sätt ugnen på 200°C."},
        { step: 2, text: "Häll hälften av mjölken i en skål. Vispa ner mjöl och salt till en jämn smet. Häll i resten av mjölken. Vispa sist ner äggen."},
        { step: 3, text: "Skär fläsket i små tärningar. Bryn dem i en stekpanna. Fördela fläsket och fett i en långpanna, 30x40 cm (för 4 port, bilden visar fläskpannkaka för 2 port) gärna med bakplåtspapper, fukta plåten lite och lägg på bakplåtspappret så ligger det still. Häll smeten över fläsktärningarna."},
        { step: 4, text: "Grädda i mitten av ugnen ca 25 min. Servera med lingonsylt."}
      ]
    },
    {
      id: 4,
      title: "Kyckling med parmaskinka och balsamsås",
      image: "kyckling_balsamsas.jpg",
      description: "A delightful dish featuring chicken with Parma ham and balsamic sauce.",
      ingredients: [
        { quantity: 500, unit: "g", name: "Kycklinglårfilé" },
        { quantity: 1, unit: "tsk", name: "Salt" },
        { quantity: 1, unit: "krm", name: "Svartpeppar" },
        { quantity: 2, unit: "msk", name: "Arla® Svenskt Smör" },
        { quantity: 2, unit: "tsk", name: "Torkad oregano" },
        { quantity: 4, unit: "skivor", name: "Parmaskinka" },
        { quantity: 2, unit: "dl", name: "Arla® vispgrädde" },
        { quantity: 2, unit: "msk", name: "Balsamvinäger" },
        { quantity: 1, unit: "msk", name: "Kycklingfond" },
        { quantity: 2, unit: "", name: "Pressade vitlöksklyftor" },
        { quantity: 150, unit: "g", name: "Sockerärter" },
        { quantity: 200, unit: "g", name: "Cocktailtomater" },
        { quantity: 1, unit: "portion", name: "Färsk oregano eller timjan" }
      ],
      instructions: [
        {step : 1, text: "Sätt ugnen på 225°."},
        {step : 2, text: "Krydda kycklingen med salt och peppar. Bryn den i smör i en stekpanna. Bland med oregano och linda skinkskivorna runt kycklingen. Lägg i en ugnssäker form."},
        {step : 3, text: "Vispa ihop grädde, vinäger, fond och vitlök. Häll det i formen. Tillaga i mitten av ugnen ca 15 min, eller tills kycklingen är genomstekt."},
        {step : 4, text: "Dela sockerärterna och cocktailtomaterna och servera till kycklingen. Toppa med färsk oregano eller timjan."}
      ]
    }
  ];

  let recipesMultiplied = recipes;
  // recipesMultiplied = recipesMultiplied.concat(recipesMultiplied);
  // recipesMultiplied = recipesMultiplied.concat(recipesMultiplied);
  // recipesMultiplied = recipesMultiplied.concat(recipesMultiplied);
  // recipesMultiplied = recipesMultiplied.concat(recipesMultiplied);
  // recipesMultiplied = recipesMultiplied.concat(recipesMultiplied);
  // recipesMultiplied = recipesMultiplied.concat(recipesMultiplied);

  const Recipes = recipesMultiplied;

export default Recipes;