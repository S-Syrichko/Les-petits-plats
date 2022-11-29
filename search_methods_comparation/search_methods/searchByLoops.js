init();

//Replaces eventlistener for performance benchmark
function init() {
  if (threeInputText.test(inputValue)) {
    filteredRecipesList = searchInputInRecipes();
  }
}

function searchInputInRecipes() {
  let searchResults = [];
  for (const recipe of recipesList) {
    recipeFitSearch = false;
    isInputInName(recipe);
    if (!recipeFitSearch) {
      isInputInDescription(recipe);
    }
    if (!recipeFitSearch) {
      isInputInIngredients(recipe);
    }
    if (recipeFitSearch) {
      searchResults.push(recipe);
    }
  }
  return searchResults;
}

function isInputInName(recipe) {
  if (recipe.name.toLowerCase().includes(inputValue)) {
    recipeFitSearch = true;
  }
}
function isInputInDescription(recipe) {
  if (recipe.description.toLowerCase().includes(inputValue)) {
    recipeFitSearch = true;
  }
}
function isInputInIngredients(recipe) {
  for (let item of recipe.ingredients) {
    if (item.ingredient.toLowerCase().includes(inputValue)) {
      recipeFitSearch = true;
      return;
    }
  }
}
