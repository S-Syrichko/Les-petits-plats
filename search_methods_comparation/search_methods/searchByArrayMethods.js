init();

//Replaces eventlistener for performance benchmark
function init() {
  if (threeInputText.test(inputValue)) {
    filteredRecipesList = recipesList.filter(searchInputInRecipes);
  }
}

function searchInputInRecipes(recipe) {
  if (
    recipe.name.toLowerCase().includes(inputValue) ||
    recipe.description.toLowerCase().includes(inputValue) ||
    recipe.ingredients.find(isInputInIngredient)
  ) {
    return recipe;
  }
}

function isInputInIngredient(item) {
  if (item.ingredient.toLowerCase().includes(inputValue)) {
    return true;
  } else {
    return false;
  }
}
