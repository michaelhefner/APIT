const ls = window.localStorage;
console.log(ls)
document
  .querySelectorAll("mh")
  .forEach((tag) => tag.replaceWith(ls[`${tag.getAttribute("name")}`]));