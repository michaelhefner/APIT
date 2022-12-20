
const contentType = { "Content-Type": "application/json" };
const output = {};
const sendTest = document.getElementById("send-test");
const bodyInput = document.querySelector("#body-build");
const key = document.querySelector("#key");
const value = document.querySelector("#value");
const inputs = document.querySelectorAll("input");
const reqHeaders = new Headers();
reqHeaders.append("Content-Type", "application/json");
reqHeaders.append("Access-Control-Allow-Origin", "*");
const divRes = document.createElement("pre");

const testData = {
  name: document.getElementById("name").value,
  description: document.getElementById("description").value,
  method: document.getElementById("selected-method").value,
  body: document.getElementById("body-build").value,
  headers: document.getElementById("headers").value,
  url: document.getElementById("url").value,
};

const setFormValues = () => {
  testData.name = document.getElementById("name").value;
  testData.description = document.getElementById("description").value;
  testData.method = document.getElementById("selected-method").value;
  testData.body = document.getElementById("body-build").value;
  testData.headers = document.getElementById("headers").value;
  testData.url = document.getElementById("url").value;
};

const clearBodyKeyValues = () => {
  key.value = "";
  value.value = "";
};

sendTest.addEventListener("click", (e) => {
  // setFormValues();
  console.log('data sent', testData)
  fetch("/send-test", {
    method: "post",
    headers: reqHeaders,
    body: JSON.stringify(testData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      divRes.innerHTML = `${data.data}`;
      document.querySelector("body").appendChild(divRes);
});
});
for (const input of inputs) {
  input.addEventListener("change", (e) => {
    setFormValues();
  });
  input.addEventListener("keyup", (e) => {

    if (e.target.id === "url") {
      if (e.target.validity.valid) {
        e.target.classList.add("input-valid");
        if (e.target.classList.contains("input-invalid")) {
          e.target.classList.remove("input-invalid");
        }
        testData.url = e.target.value;
      } else {
        if (e.target.classList.contains("input-valid")) {
          e.target.classList.remove("input-valid");
        }
        e.target.classList.add("input-invalid");
        e.target.classList.add("input-invalid");
      }
      if (e.key === 'Enter') {
        sendTest.click();
      }
    }
  });
}
const addKeyValue = document.querySelector("#add-values");
addKeyValue.addEventListener("click", (e) => {
  console.log("add key value");
  output[key.value] = value.value;
  bodyInput.innerHTML = JSON.stringify(output);
  // clearBodyKeyValues();
});
