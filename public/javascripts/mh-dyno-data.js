const ls = window.localStorage;
document
  .querySelectorAll("mh")
  .forEach((tag) => tag.replaceWith(ls[`${tag.getAttribute("name")}`]));
const contentType = { "Content-Type": "application/json" };
const output = {};
const sendTest = document.getElementById("send-test");
const bodyInput = document.querySelector("#body-build");
const key = document.querySelector("#key");
const value = document.querySelector("#value");
const inputs = document.querySelectorAll("input");

let method = document.getElementById("selected-method").value;
let url = document.getElementById("url").value;
let body = document.getElementById("body-build").value;
let headers = document.getElementById("headers").value;


const setFormValues = () => {
  method = document.getElementById("selected-method").value;
  url = document.getElementById("url").value;
  body = document.getElementById("body-build").value;
  headers = document.getElementById("headers").value;
};

const clearBodyKeyValues = () => {
  key.value = "";
  value.value = "";
};

sendTest.addEventListener("click", (e) => {
  setFormValues();
  const test = {
    // name: document.getElementById('name').value,
    // description: document.getElementById('description').value,
    method: method,
    body: body,
    headers: headers,
    url: url,
  };
  if (method === "GET"){

    fetch(test.url)
      .then((res) => res.json())
      .then((data) => console.log(data));
  } else {
    fetch(test.url, {
      method: test.method,
      mode: "cors",
      headers: contentType,
      body: JSON.stringify(output),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

  }
});

for (const input of inputs) {

  input.addEventListener("keyup", (e) => {
    if(e.target.id === "url") {
      if (e.target.validity.valid) {
        e.target.classList.add("input-valid");
        if(e.target.classList.contains("input-invalid")) {

        e.target.classList.remove("input-invalid");
        }
      } else {
        if (e.target.classList.contains("input-valid")) {
        e.target.classList.remove("input-valid");
        }
        e.target.classList.add("input-invalid");
        e.target.classList.add("input-invalid");
      }
    }
  });
}
const addKeyValue = document.querySelector("#add-values");
addKeyValue.addEventListener("click", (e) => {
  console.log("add key value");
  output[key.value] = value.value;
  bodyInput.innerHTML = JSON.stringify(output);
  clearBodyKeyValues();
});
