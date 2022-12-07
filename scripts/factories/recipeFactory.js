import {
  createElementWithClass,
  firstLetterCapital,
  removeElementFromArray,
} from "../utils/functions.js";
import {
  searchLists,
  filteredRecipesList,
  displayTagLists,
} from "../pages/index.js";

const recipesContainer = document.querySelector(".recipes-section > .row");

export function recipeFactory(data) {
  let {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  let recipeCardDOM = undefined;

  function constructorRecipeCard() {
    //container
    const divContainer = createElementWithClass(
      "div",
      "col-12 col-md-6 col-xl-4"
    );
    //article
    const article = createElementWithClass("article", "card border-0 bg-light");
    //anchor
    const link = createElementWithClass("a", "link");
    link.setAttribute("href", "#");
    //img
    const cardThumbnail = createElementWithClass("img", "card-img-top");
    cardThumbnail.setAttribute("src", "./assets/images/recipe.jpg");
    cardThumbnail.setAttribute("alt", name);
    //card body
    const cardBody = createElementWithClass(
      "div",
      "container card__body flex-grow-0 overflow-hidden p-0 mt-20"
    );
    //card banner
    const cardBanner = createElementWithClass(
      "div",
      "card__banner row w-100 m-0 align-items-center justify-content-between"
    );
    //title
    const cardTitle = createElementWithClass(
      "h2",
      "card__title col-8 m-0 p-0 fw-normal d-inline-block align-text-bottom overflow-hidden text-truncate"
    );
    cardTitle.textContent = name;
    //time container
    const timeContainer = createElementWithClass(
      "div",
      "card__time-container col-4 p-0 w20 d-flex justify-content-around"
    );
    //time icon
    const timeIcon = createElementWithClass("i", "far fa-clock");
    timeIcon.setAttribute("aria-hidden", "true");
    //time content
    const timeContent = createElementWithClass(
      "p",
      "card__time-content fw-bold d-inline-block align-text-center m-0"
    );
    timeContent.textContent = `${time} min`;
    //description container
    const cardDescription = createElementWithClass(
      "div",
      "card__description row w-100 m-0"
    );
    //ingredients container
    const ingredientsContainer = createElementWithClass(
      "div",
      "card__ingredients-container col m-0 p-0"
    );
    //ingredients
    ingredients.forEach((ingredient) => {
      const ingredientParagraph = createElementWithClass(
        "p",
        "card__ingredient small fw-bold m-0 pe-2 text-truncate"
      );
      ingredientParagraph.textContent = `${ingredient.ingredient}`;
      if (ingredient.quantity !== undefined) {
        //ingredient quantity
        ingredientParagraph.textContent += `: `;
        const quantitySpan = document.createElement("span");
        ingredientParagraph.appendChild(quantitySpan);
        quantitySpan.classList.add("fw-normal");
        quantitySpan.textContent = `${ingredient.quantity}`;
        //ingredient unit
        if (ingredient.unit !== undefined) {
          quantitySpan.textContent += ` ${ingredient.unit}`;
        }
      }
      //append ingredients
      ingredientsContainer.appendChild(ingredientParagraph);
    });

    //instructions container
    const columnInstructions = createElementWithClass(
      "div",
      "card__instructions col m-0 p-0"
    );
    //instructions
    const instructionsParagraph = createElementWithClass(
      "p",
      "card__instructions__content small lh-sm"
    );
    instructionsParagraph.textContent = description;

    //append
    divContainer.appendChild(article);
    article.appendChild(link);
    link.appendChild(cardThumbnail);
    article.appendChild(cardBody);
    cardBody.appendChild(cardBanner);
    cardBody.appendChild(cardDescription);
    cardBanner.appendChild(cardTitle);
    cardBanner.appendChild(timeContainer);
    timeContainer.appendChild(timeIcon);
    timeContainer.appendChild(timeContent);
    cardDescription.appendChild(ingredientsContainer);
    cardDescription.appendChild(columnInstructions);
    columnInstructions.appendChild(instructionsParagraph);

    //save DOM element
    this.recipeCardDOM = divContainer;
  }
  function displayRecipeCard() {
    if (
      this.recipeCardDOM !== undefined &&
      !recipesContainer.contains(this.recipeCardDOM)
    ) {
      recipesContainer.appendChild(this.recipeCardDOM);
      addRecipeToTags();
    }
  }
  function removeRecipeCard() {
    if (
      this.recipeCardDOM !== undefined &&
      recipesContainer.contains(this.recipeCardDOM)
    ) {
      recipesContainer.removeChild(this.recipeCardDOM);
      removeRecipeFromTags();
    }
  }
  
  function addRecipeToTags() {
    addIngredients();
    addAppliances();
    addUstensils();
    displayTagLists();
  }
  function addIngredients() {
    if (ingredients) {
      ingredients.forEach((tag) => {
        const lowerCaseIngredient = tag.ingredient.toLowerCase();
        if (!searchLists.ingredients.globalSearch.includes(lowerCaseIngredient)) {
          //push
          searchLists.ingredients.globalSearch.push(lowerCaseIngredient);
        }
      });
    }
  }
  function addAppliances() {
    if (appliance) {
      const lowerCaseAppliance = appliance.toLowerCase();
      if (!searchLists.appliances.globalSearch.includes(lowerCaseAppliance)) {
        //push
        searchLists.appliances.globalSearch.push(lowerCaseAppliance);
      }
    }
  }
  function addUstensils() {
    if (ustensils) {
      ustensils.forEach((utensil) => {
        const lowerCaseUtensil = utensil.toLowerCase();
        if (!searchLists.ustensils.globalSearch.includes(lowerCaseUtensil)) {
          //push
          searchLists.ustensils.globalSearch.push(lowerCaseUtensil);
        }
      });
    }
  }

  function removeRecipeFromTags() {
    removeIngredients();
    removeAppliances();
    removeUstensils();
    displayTagLists();
  }
  function removeIngredients() {
    ingredients.forEach((ingredient) => {
      let deleteIngredient = true;
      //Check if ingredient is present in matched recipes
      filteredRecipesList.forEach((recipe) => {
        recipe.ingredients.forEach((element) => {
          if (
            element.ingredient.toLowerCase() ==
            ingredient.ingredient.toLowerCase()
          ) {
            deleteIngredient = false;
          }
        });
      });
      //Remove from array if not present
      if (deleteIngredient) {
        searchLists.ingredients.globalSearch = removeElementFromArray(
          ingredient.ingredient.toLowerCase(),
          searchLists.ingredients.globalSearch
        );
      }
    });
  }
  function removeAppliances() {
    let deleteAppliance = true;
    //Check if appliance is present in matched recipes
    filteredRecipesList.forEach((recipe) => {
      if (
        recipe.appliance.toLowerCase() == appliance.toLowerCase()
      ) {
        deleteAppliance = false;
      }
    });
    //Remove from array if not present
    if (deleteAppliance) {
      searchLists.appliances.globalSearch = removeElementFromArray(
        appliance.toLowerCase(),
        searchLists.appliances.globalSearch
      );
      
    }
  }
  function removeUstensils() {
    let deleteUstensil = true;
    ustensils.forEach((item) => {
      filteredRecipesList.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          if (item.toLowerCase() == ustensil.toLowerCase()) {
            deleteUstensil = false;
          }
        });
      });
      //Remove from array if not present
      if (deleteUstensil) {
        searchLists.ustensils.globalSearch = removeElementFromArray(
          item.toLowerCase(),
          searchLists.ustensils.globalSearch
        );
      }
    });
  }
  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    recipeCardDOM,
    constructorRecipeCard,
    displayRecipeCard,
    removeRecipeCard,
  };
}
