import {
  searchLists,
  displayTagLists,
  displayIngredientTags,
  displayApplianceTags,
  displayUstensilTags,
  setSearchLists,
} from "../pages/index.js";

const ingredientsInputField = document.getElementById("ingredients-search");
const appliancesInputField = document.getElementById("appliances-search");
const ustensilsInputField = document.getElementById("ustensils-search");

const threeInputText = /[A-Za-zÀ-ú]{3,}/;
let inputValue;

ingredientsInputField.onkeyup = (e) => {
  e.preventDefault();
  filterTagsByInput(ingredientsInputField.value.toLowerCase(), "ingredients");
};

appliancesInputField.onkeyup = (e) => {
  e.preventDefault();
  filterTagsByInput(appliancesInputField.value.toLowerCase(), "appliances");
};

ustensilsInputField.onkeyup = (e) => {
  e.preventDefault();
  filterTagsByInput(ustensilsInputField.value.toLowerCase(), "ustensils");
};

function filterTagsByInput(value, type) {
  inputValue = value;
  let filterResults = [];
  if (!threeInputText.test(inputValue)) {
    displayTagLists();
    return;
  }
  filterResults = searchLists[type].globalSearch.filter((element) => {
    return element.toLowerCase().includes(inputValue.toLowerCase());
  });
  switch (type) {
    case "ingredients":
      setSearchLists({ ingredientsAdvanced: filterResults });
      displayIngredientTags(true);
      break;
    case "appliances":
      setSearchLists({ appliancesAdvanced: filterResults });
      displayApplianceTags(true);
      break;
    case "ustensils":
      setSearchLists({ ustensilsAdvanced: filterResults });
      displayUstensilTags(true);
      break;
  }
}
