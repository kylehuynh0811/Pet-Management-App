"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

/*
//Test data for breeds
const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed2 = {
  breed: "Tabby",
  type: "Cat",
};
const breed4 = {
  breed: "Meo Muop",
  type: "Cat",
};
*/

// Get the Breeds data from local storage
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed4]);
}

const breedArr = getFromStorage("breedArr");
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
  if (data.type === "Select Type") {
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

function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((breedItem, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${breedItem.breed}</td>
    <td scope="col">${breedItem.type}</td>
    <td><button type="button" onclick= "deleteBreed(${
      breedItem.breed
    })"class="btn btn-danger">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  });
}
/////////
//Delete a breed
function deleteBreed(breed) {
  const isDeletable = confirm("Are you sure you want to delete this breed?");
  if (isDeletable) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
