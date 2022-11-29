export function createElementWithClass(element, className) {
  let newElement = document.createElement(`${element}`);
  newElement.setAttribute("class", className);
  return newElement;
}

export function firstLetterCapital(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeElementFromArray(element, array){
  return array.filter((item) => {
    return item !== element
  })
}

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}