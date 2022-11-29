import { recipesData } from "../../data/recipes.js";
import { recipesList } from "../pages/index.js";
import { recipeFactory } from "../factories/recipeFactory.js";

export async function getAllRecipes() {
  recipesData.forEach((recipeData) => {
    const recipe = recipeFactory(recipeData);
    recipe.constructorRecipeCard();
    //save recipe
    recipesList.push(recipe);
  });
}
