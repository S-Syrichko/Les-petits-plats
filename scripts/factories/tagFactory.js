import {
  createElementWithClass,
  firstLetterCapital,
  removeElementFromArray,
} from "../utils/functions.js";
import { searchLists, displayAllRecipes } from "../pages/index.js";
import { filterRecipesByTag } from "../components/searchEngine.js";

const tagsContainer = document.querySelector(".tags-container");

export function tagFactory(type, content) {
  const filterType = type;
  const tagName = firstLetterCapital(content);

  let tagDOM = undefined;

  //filter DOM
  const filterDOM = createElementWithClass("p", "dropdown-item");
  filterDOM.textContent = tagName;

  filterDOM.addEventListener("click", () => {
    addTag();
  });

  function addTag() {
    tagDOM == undefined && createTagDOM();
    if (tagDOM !== undefined && !searchLists.selected.includes(tagName)) {
      tagsContainer.appendChild(tagDOM);
      searchLists.selected.push(tagName);
      filterRecipesByTag(tagName.toLowerCase(), filterType);
    }
  }
  function createTagDOM() {
    let colorClassName;
    switch (filterType) {
      case "ingredient":
        colorClassName = "btn-secondary";
        break;
      case "appliance":
        colorClassName = "btn-success";
        break;
      case "utensil":
        colorClassName = "btn-danger";
        break;
      default:
        console.log("Unexpected filterType value");
    }
    const tagContainer = createElementWithClass(
      "div",
      "tag btn " +
        colorClassName +
        " text-white d-flex justify-content-around align-items-center p-2"
    );
    const tagContent = createElementWithClass("p", "tag__content m-0 me-2");
    tagContent.textContent = tagName;
    const tagDeleteBtn = createElementWithClass("i", "far fa-circle-xmark");
    tagDeleteBtn.addEventListener("click", () => {
      deleteTag();
    });
    //append
    tagContainer.appendChild(tagContent);
    tagContainer.appendChild(tagDeleteBtn);

    //save DOM element
    tagDOM = tagContainer;
  }
  function deleteTag() {
    if (tagDOM !== undefined && searchLists.selected.includes(tagName)) {
      tagsContainer.removeChild(tagDOM);
      searchLists.selected = removeElementFromArray(
        tagName,
        searchLists.selected
      );
      if (!searchLists.selected.length) {
        displayAllRecipes();
      }
    }
  }
  return { filterDOM, tagDOM };
}
