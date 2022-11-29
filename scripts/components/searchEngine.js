import {
  filteredRecipesList,
  setFilteredRecipesList,
  displayAllRecipes,
  searchLists,
} from "../pages/index.js";

const searchInputField = document.getElementById("search-input");
const noRecipeText = document.querySelector(".norecipe-text");

const threeInputText = /[A-Za-zÀ-ú]{3,}/;
export let inputValue;
let recipeFitSearch = false;
let searchResults = [];

searchInputField.onkeyup = (e) => {
  e.preventDefault();
  searchResults = [];
  filterRecipesByInput(searchInputField.value.toLowerCase());
};

function filterRecipesByInput(value) {
  inputValue = value;
  if (threeInputText.test(inputValue)) {
    searchInputInRecipes();
    setFilteredRecipesList(searchResults);
  } else if (!inputValue && !searchLists.selected.length) {
    displayAllRecipes();
  }
}

export function filterRecipesByTag(value, type) {
  inputValue = value;
  searchResults = [];
  searchInputInRecipes(type);
  setFilteredRecipesList(searchResults);
}

async function searchInputInRecipes(type = "all") {
  let searchSuccess = false;
  for (const recipe of filteredRecipesList) {
    recipeFitSearch = false;
    switch (type) {
      case "all":
        const concurrentSearches = [
          isInputInName(recipe),
          isInputInDescription(recipe),
          isInputInIngredients(recipe),
        ];
        await Promise.all(concurrentSearches);
        break;
      case "ingredient":
        await isInputInIngredients(recipe);
        break;
      case "appliance":
        await isTagInAppliances(recipe);
        break;
      case "utensil":
        await isTagInUstensils(recipe);
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

async function isInputInName(recipe) {
  if (recipe.name.toLowerCase().includes(inputValue)) {
    recipeFitSearch = true;
  }
}
async function isInputInDescription(recipe) {
  if (recipe.description.toLowerCase().includes(inputValue)) {
    recipeFitSearch = true;
  }
}
async function isInputInIngredients(recipe) {
  for (let item of recipe.ingredients) {
    if (item.ingredient.toLowerCase().includes(inputValue)) {
      recipeFitSearch = true;
      return;
    }
  }
}
async function isTagInAppliances(recipe) {
  if (recipe.appliance.toLowerCase().includes(inputValue)) {
    recipeFitSearch = true;
  }
}
async function isTagInUstensils(recipe) {
  for (let utensil of recipe.ustensils) {
    if (utensil.toLowerCase().includes(inputValue)) {
      recipeFitSearch = true;
    }
  }
}
