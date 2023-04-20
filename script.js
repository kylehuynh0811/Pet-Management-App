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
const calculateBMIBtn = document.getElementById("calculate-bmi-btn");

const test1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "rgb(255,0,0)",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
  bmi: "?",
};
const test2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "rgb(0,128,0)",
  breed: "Phu Quoc",
  vaccinated: false,
  dewormed: false,
  sterilized: true,
  date: new Date(),
  bmi: "?",
};
//Test data
const petArr = [];
petArr.push(test1, test2);
renderTableData(petArr);

//Run when user click "Submit"
submitBtn.addEventListener("click", function (e) {
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
    date: new Date(),
    bmi: "?",
  };
  console.log(data);
  //Validate the data before processing

  const validate = validateData(data);

  //console.log(validate);

  if (validate) {
    petArr.push(data);
    //Show the pet in the table
    renderTableData(petArr);
    //Clear the user inputs in the form
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
                <td>${pet.bmi}</td>
                <td>${pet.date}</td>
                <td>
                  <button type="button" class="btn btn-danger" onclick="deletePet('${
                    pet.id
                  }')">Delete</button>
                </td>`;
    tableBodyEl.appendChild(row);
  });
}
// Delete a pet when user click on the Delete button\
function deletePet(petId) {
  const isDeletable = confirm("Are you sure you want to delete this pet?");
  if (isDeletable) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTableData(petArr);
        break;
      }
    }
  }
}
//Show healthy pet
let healthyCheck = true;
const healthyBtn = document.getElementById("healthy-btn");
//Run when user click "Show Healthy Pet"
healthyBtn.addEventListener("click", function () {
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
//Calculating BMI
calculateBMIBtn.onclick = function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }
  renderTableData(petArr);
};
////////////////////////////////////////////////////////////////////////////////////////////////////
