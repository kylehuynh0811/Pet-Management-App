"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const breedArr = getFromStorage("breedArr") ?? [];

const breed1 = {
  breed: "Tabby",
  type: "Cat",
};
const breed2 = {
  breed: "nani",
  type: "Dog",
};
const breed3 = {
  breed: "Bulldog",
  type: "Dog",
};

if (breedArr.length === 0) {
  saveToStorage("breedArr", [breed1, breed2, breed3]);
}

// Render Breeds data
renderTableBreed(breedArr);

////////////
//Run when user click submit
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // Validate inputs
  const isValidate = validate(data);
  if (isValidate) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
    clearInput();
  }
});

function validate(data) {
  let isValidate = true;
  const InputErrors = [];
  // Empty breed name field
  if (breedInput.value.trim().length === 0) {
    InputErrors.push(" Breed name is empty");
    isValidate = false;
  }
  // Type selection left at default
  if (typeInput.value === "Select Type") {
    InputErrors.push(" Type must be selected");
    isValidate = false;
  }

  if (InputErrors.length === 0) {
    isValidate = true;
  } else {
    alert(
      `Please check the invalid properties of the pet's breed: ${InputErrors} `
    );
    isValidate = false;
  }
  return isValidate;
}

//////
//Clear user's input
function clearInput() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}
//Show the table of breeds
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((breedItem, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${breedItem.breed}</td>
    <td scope="col">${breedItem.type}</td>
    <td><button type="button" onclick= "deleteBreed('${
      breedItem.breed
    }')" class="btn btn-danger">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  });
}
/////////
//Delete a breed
function deleteBreed(breedId) {
  const isDeletable = confirm("Are you sure you want to delete this pet?");
  if (isDeletable) {
    DeleteChosenBreed(breedId);
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
  }
}
//Looping through the array to find the pet user want to be deleted
const DeleteChosenBreed = (breedId) => {
  for (let i = 0; i < breedArr.length; i++) {
    if (breedId === breedArr[i].breed) {
      breedArr.splice(i, 1);
      break;
    }
  }
};
