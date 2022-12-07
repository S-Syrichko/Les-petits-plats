import {
  filteredRecipesList,
  setFilteredRecipesList,
  displayAllRecipes,
  searchLists,
} from "../pages/index.js";

const searchInputField = document.getElementById("search-input");
const noRecipeText = document.querySelector(".norecipe-text");

const threeInputText = /[A-Za-zÀ-ú]{3,}/;
let recipeFitSearch = false;
export let searchInput;
let searchResults = [];

searchInputField.onkeyup = (e) => {
  e.preventDefault();
  searchResults = [];
  searchInput = searchInputField.value.toLowerCase();
  filterRecipesByInput(searchInputField.value.toLowerCase());
};

function filterRecipesByInput(value) {
  if (threeInputText.test(value)) {
    searchInputInRecipes(value);
    setFilteredRecipesList(searchResults);
  } else if (!searchInput && !searchLists.selected.length) {
    displayAllRecipes();
  }
}

export function filterRecipesByTag(value, type) {
  searchResults = [];
  searchInputInRecipes(value, type);
  setFilteredRecipesList(searchResults);
}

async function searchInputInRecipes(value, type = "all") {
  let searchSuccess = false;
  for (const recipe of filteredRecipesList) {
    recipeFitSearch = false;
    switch (type) {
      case "all":
        const concurrentSearches = [
          isInputInName(recipe, value),
          isInputInDescription(recipe, value),
          isInputInIngredients(recipe, value),
        ];
        await Promise.all(concurrentSearches);
        break;
      case "ingredient":
        await isInputInIngredients(recipe, value);
        break;
      case "appliance":
        await isTagInAppliances(recipe, value);
        break;
      case "utensil":
        await isTagInUstensils(recipe, value);
        break;
      default:
        console.log("Unexpected type value for tag" + type);
    }

    if (recipeFitSearch) {
      searchSuccess = true;
      recipe.displayRecipeCard();
      searchResults.push(recipe);
    } else {
      recipe.removeRecipeCard();
    }
  }
  //Display search message
  if (!searchSuccess) {
    noRecipeText.style.display = "block";
  } else {
    noRecipeText.style.display = "none";
  }
}

async function isInputInName(recipe, value) {
  if (recipe.name.toLowerCase().includes(value)) {
    recipeFitSearch = true;
  }
}
async function isInputInDescription(recipe, value) {
  if (recipe.description.toLowerCase().includes(value)) {
    recipeFitSearch = true;
  }
}
async function isInputInIngredients(recipe, value) {
  for (let item of recipe.ingredients) {
    if (item.ingredient.toLowerCase().includes(value)) {
      recipeFitSearch = true;
      return;
    }
  }
}
async function isTagInAppliances(recipe, value) {
  if (recipe.appliance.toLowerCase().includes(value)) {
    recipeFitSearch = true;
  }
}
async function isTagInUstensils(recipe, value) {
  for (let utensil of recipe.ustensils) {
    if (utensil.toLowerCase().includes(value)) {
      recipeFitSearch = true;
    }
  }
}
