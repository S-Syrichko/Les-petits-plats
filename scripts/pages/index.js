import { getAllRecipes } from "../API/fetchData.js";
import "../components/searchEngine.js";
import "../components/searchTags.js";
import { tagFactory } from "../factories/tagFactory.js";
import { removeAllChildNodes } from "../utils/functions.js";

//DOM elements
const ingredientsContainer = document.querySelector(
  ".ingredients-dropdown .dropdown-filters"
);
const appliancesContainer = document.querySelector(
  ".appliances-dropdown .dropdown-filters"
);
const ustensilsContainer = document.querySelector(
  ".ustensils-dropdown .dropdown-filters"
);

//vars
export const recipesList = [];
export const searchLists = {
  ingredients: {
    globalSearch: [],
    advancedSearch: [],
  },
  appliances: {
    globalSearch: [],
    advancedSearch: [],
  },
  ustensils: {
    globalSearch: [],
    advancedSearch: [],
  },
  selected: [],
};

export function setSearchLists({
  ingredientsGlobal: globalIngredientsList,
  ingredientsAdvanced: advancedIngredientsList,
  
  appliancesGlobal: globalAppliancesList,
  appliancesAdvanced: advancedAppliancesList,
  
  ustensilsGlobal: globalUstensilsList,
  ustensilsAdvanced: advancedUstensilsList,
}) {
  if (globalIngredientsList) {
    searchLists.ingredients.globalSearch = globalIngredientsList;
  }
  if (advancedIngredientsList) {
    searchLists.ingredients.advancedSearch = advancedIngredientsList;
  }
  if (globalAppliancesList) {
    searchLists.appliances.globalSearch = globalAppliancesList;
  }
  if (advancedAppliancesList) {
    searchLists.appliances.advancedSearch = advancedAppliancesList;
  }
  if (globalUstensilsList) {
    searchLists.ustensils.globalSearch = globalUstensilsList;
  }
  if (advancedUstensilsList) {
    searchLists.ustensils.advancedSearch = advancedUstensilsList;
  }
}

export let filteredRecipesList = [];

export function setFilteredRecipesList(newList) {
  filteredRecipesList = newList;
}

async function init() {
  await getAllRecipes();
  displayAllRecipes();
}

export function displayAllRecipes() {
  recipesList.forEach((recipe) => {
    recipe.displayRecipeCard();
  });
  setFilteredRecipesList(recipesList);
}

export function displayTagLists(advancedSearch = false) {
  displayIngredientTags(advancedSearch);
  displayApplianceTags(advancedSearch);
  displayUstensilTags(advancedSearch);
}

export function displayIngredientTags(advancedSearch) {
  const arrayToDisplay = advancedSearch
    ? searchLists.ingredients.advancedSearch
    : searchLists.ingredients.globalSearch;
  removeAllChildNodes(ingredientsContainer);
  if (arrayToDisplay.length) {
    arrayToDisplay.forEach((ingredient) => {
      //create DOM
      const tagDOM = tagFactory("ingredient", ingredient);
      ingredientsContainer.appendChild(tagDOM.filterDOM);
    });
  }
}
export function displayApplianceTags(advancedSearch) {
  const arrayToDisplay = advancedSearch
    ? searchLists.appliances.advancedSearch
    : searchLists.appliances.globalSearch;
  removeAllChildNodes(appliancesContainer);
  if (arrayToDisplay.length) {
    arrayToDisplay.forEach((appliance) => {
      //create DOM
      const tagDOM = tagFactory("appliance", appliance);
      appliancesContainer.appendChild(tagDOM.filterDOM);
    });
  }
}

export function displayUstensilTags(advancedSearch) {
  const arrayToDisplay = advancedSearch
    ? searchLists.ustensils.advancedSearch
    : searchLists.ustensils.globalSearch;
  removeAllChildNodes(ustensilsContainer);
  if (arrayToDisplay.length) {
    arrayToDisplay.forEach((utensil) => {
      //create DOM
      const tagDOM = tagFactory("utensil", utensil);
      ustensilsContainer.appendChild(tagDOM.filterDOM);
    });
  }
}

init();
