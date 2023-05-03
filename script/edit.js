"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const formEl = document.getElementById("container-form");
const petArr = getFromStorage("petArr") ?? [];
const breedArr = getFromStorage("breedArr") ?? [];

renderTableData(petArr);

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
                <td>${pet.name}</td>
                <td>${pet.age}</td>
                <td>${pet.type}</td>
                <td>${pet.weight}</td>
                <td>${pet.length}</td>
                <td>${pet.breed}</td>
                <td>
                  <i type="color" class="bi bi-square-fill" style="color:${
                    pet.color
                  }"></i>
                </td>
                <td><i class="bi ${
                  pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
                }"></i></td>
                <td>${pet.date}</td>
                <td>
                  <button type="button" class="btn btn-warning" onclick="editPet('${
                    pet.id
                  }')">Edit</button>
                </td>`;
    tableBodyEl.appendChild(row);
  });
}

function editPet(id) {
  //Unhide the form
  formEl.classList.remove("hide");
  //Look for the exact pet to edit in petArr
  const pet = petArr.find((petItem) => petItem.id === id);
  //Show the pet's info on the form
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  //Show the breed of the chosen type
  renderBreed();
  breedInput.value = pet.breed;
}

//Show the breeds for user to choose
typeInput.addEventListener("click", renderBreed);

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  //Array for dog breeds
  const DogBreeds = breedArr.filter((breedItem) => breedItem.type === "Dog");
  //Array for cat breeds
  const CatBreeds = breedArr.filter((breedItem) => breedItem.type === "Cat");

  if (typeInput.value === "Dog") {
    DogBreeds.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
  if (typeInput.value === "Cat") {
    CatBreeds.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}
///////////////
//Run when user click submit
submitBtn.addEventListener("click", function () {
  //Collect data from the form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  //Validate user's input
  const isValidate = validateData(data);
  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    //Keep the date
    data.date = petArr[index].date;
    //
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    //Make the form hidden and show the table
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
/////////////////
function validateData(data) {
  const InputErrors = [];
  let isValidate = true;
  // No empty input field
  if (data.id.trim() === "") {
    InputErrors.push(" Pet ID is empty");
    if (data.name.trim() === "") {
      InputErrors.push(" Pet name is empty");
    }
    //Age must be between 1 and 15!
    if (isNaN(data.age)) {
      InputErrors.push(" Pet age is empty");
    } else if (data.age < 1 || data.age > 15) {
      InputErrors.push(" Pet age input must be between 1 and 15");
    }
    //Weight must be between 1 and 15!
    if (isNaN(data.weight)) {
      InputErrors.push(" Pet weight is empty");
    } else if (data.weight < 1 || data.weight > 15) {
      InputErrors.push(" Pet weight input must be between 1 and 15");
    }
    //Length must be between 1 and 100!
    if (isNaN(data.length)) {
      InputErrors.push(" Pet length is empty");
    } else if (data.length < 1 || data.length > 100) {
      InputErrors.push(" Pet length input must be between 1 and 100");
    }
    //Please select pet type!
    if (data.type.trim() === "Select Type") {
      InputErrors.push(" Pet type must be selected");
    }
    //Please select pet breed!
    if (data.breed.trim() === "Select Breed") {
      InputErrors.push(" Pet breed must be selected");
    }
  } else {
    if (data.name.trim() === "") {
      InputErrors.push(" Pet name is empty");
    }
    //Age must be between 1 and 15!
    if (isNaN(data.age)) {
      InputErrors.push(" Pet age is empty");
    } else if (data.age < 1 || data.age > 15) {
      InputErrors.push(" Pet age input must be between 1 and 15");
    }
    //Weight must be between 1 and 15!
    if (isNaN(data.weight)) {
      InputErrors.push(" Pet weight is empty");
    } else if (data.weight < 1 || data.weight > 15) {
      InputErrors.push(" Pet weight input must be between 1 and 15");
    }
    //Length must be between 1 and 100!
    if (isNaN(data.length)) {
      InputErrors.push(" Pet length is empty");
    } else if (data.length < 1 || data.length > 100) {
      InputErrors.push(" Pet length input must be between 1 and 100");
    }
    //Please select pet type!
    if (data.type.trim() === "Select Type") {
      InputErrors.push(" Pet type must be selected");
    }
    //Please select pet breed!
    if (data.breed.trim() === "Select Breed") {
      InputErrors.push(" Pet breed must be selected");
    }
  }
  //console.log(InputErrors);
  if (InputErrors.length === 0) {
    isValidate = true;
  } else {
    alert(`Please check the invalid properties of the pet: ${InputErrors} `);
    isValidate = false;
  }
  return isValidate;
}
