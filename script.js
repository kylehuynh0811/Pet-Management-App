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
const petArr = getFromStorage("petArr") ?? [];
const breedArr = getFromStorage("breedArr") ?? [];
//Test data when the input is empty
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date().toLocaleDateString("vi-vn"),
};
const data2 = {
  id: "P002",
  name: "Jerry",
  age: 4,
  type: "Dog",
  weight: 10,
  length: 65,
  color: "pink",
  breed: "nani",
  vaccinated: true,
  dewormed: false,
  sterilized: true,
  date: new Date().toLocaleDateString("vi-vn"),
};
const data3 = {
  id: "P003",
  name: "Kilo",
  age: 2,
  type: "Dog",
  weight: 12,
  length: 50,
  color: "blue",
  breed: "Bulldog",
  vaccinated: false,
  dewormed: false,
  sterilized: true,
  date: new Date().toLocaleDateString("vi-vn"),
};

//Use the sample data when localStorage is empty
if (petArr.length === 0) {
  saveToStorage("petArr", [data1, data2, data3]);
}

renderTableData(petArr);

//When user choose the pet type, show the breeds according to the type chosen
typeInput.addEventListener("click", renderBreeds());

function renderBreeds() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  //Array for dog breeds
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  //Array for cat breeds
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  //Selected type is Dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    //Selected type is Cat
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

//Run when user click "Submit"
submitBtn.addEventListener("click", (e) => {
  // Prevent the submit event from refreshing the page
  e.preventDefault();
  //Take the input data from the form
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
    date: new Date().toLocaleDateString("vi-VN"),
  };

  //console.log(data);
  //Validate the data before processing

  const validate = validateData(data);

  //console.log(validate);

  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", data);
    renderTableData(petArr);
    clearInput();
  }
});

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
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        InputErrors.push(" Pet ID must be Unique");
        break;
      }
    }
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
// Clear user input on the form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
//render the table on the site
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
                  <i class="bi bi-square-fill" style="color:${pet.color}"></i>
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
                  <button type="button" class="btn btn-danger" onclick="deletePet('${
                    pet.id
                  }')">Delete</button>
                </td>`;
    tableBodyEl.appendChild(row);
  });
}
// Delete a pet when user click on the Delete button
function deletePet(petId) {
  const isDeletable = confirm("Are you sure you want to delete this pet?");
  if (isDeletable) {
    DeleteChosenPet(petId);
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
  }
}
//Looping through the array to find the pet user want to be deleted
const DeleteChosenPet = (petId) => {
  for (let i = 0; i < petArr.length; i++) {
    if (petId === petArr[i].id) {
      petArr.splice(i, 1);
      break;
    }
  }
};
//Show healthy pet
let healthyCheck = true;
const healthyBtn = document.getElementById("healthy-btn");
//Run when user click "Show Healthy Pet"
healthyBtn.addEventListener("click", () => {
  if (healthyCheck === true) {
    const healthypetArr = petArr.filter(
      (petArr) => petArr.vaccinated && petArr.dewormed && petArr.sterilized
    );
    renderTableData(healthypetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
    console.log(healthyCheck);
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////
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
