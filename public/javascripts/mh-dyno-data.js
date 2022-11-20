const ls = window.localStorage;
document.querySelectorAll('mh').forEach(tag => tag.replaceWith(ls[`${tag.getAttribute('name')}`]));
console.log(ls);