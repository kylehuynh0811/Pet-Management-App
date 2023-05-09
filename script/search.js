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
const findBtn = document.getElementById("find-btn");
const petArr = getFromStorage("petArr") ?? [];
const breedArr = getFromStorage("breedArr") ?? [];

//////////////////``
//Run when user click "Find"

findBtn.addEventListener("click", function () {
  // 1: If user leave all the fields empty, show every pet that is in the localStorrage
  // 2: When user put in different criteria. show the pets that have every attribute matched with those criteria
  let petArrFind = petArr;
  if (
    typeInput.value === "Select Type" &&
    breedInput.value === "Select Breed"
  ) {
    if (idInput.value) {
      petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
    }
    if (nameInput.value) {
      petArrFind = petArrFind.filter((pet) =>
        pet.name.includes(nameInput.value)
      );
    }
    if (vaccinatedInput.checked === true) {
      petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
    }
    if (dewormedInput.checked === true) {
      petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
    }
    if (sterilizedInput.checked === true) {
      petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
    }
  } else {
    if (typeInput.value === "Select Type") {
      if (breedInput.value !== "Select Breed") {
        petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
      }
      if (idInput.value) {
        petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
      }
      if (nameInput.value) {
        petArrFind = petArrFind.filter((pet) =>
          pet.name.includes(nameInput.value)
        );
      }
      if (vaccinatedInput.checked === true) {
        petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
      }
      if (dewormedInput.checked === true) {
        petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
      }
      if (sterilizedInput.checked === true) {
        petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
      }
    }
    if (typeInput.value === "Select Breed") {
      {
        if (breedInput.value !== "Select Type") {
          petArrFind = petArrFind.filter(
            (pet) => pet.breed === typeInput.value
          );
        }
        if (idInput.value) {
          petArrFind = petArrFind.filter((pet) =>
            pet.id.includes(idInput.value)
          );
        }
        if (nameInput.value) {
          petArrFind = petArrFind.filter((pet) =>
            pet.name.includes(nameInput.value)
          );
        }
        if (vaccinatedInput.checked === true) {
          petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
        }
        if (dewormedInput.checked === true) {
          petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
        }
        if (sterilizedInput.checked === true) {
          petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
        }
      }
    }
  }
  //Show the pets that match the criteria
  renderTableData(petArrFind);
});

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
                <td>${pet.date}</td>`;
    tableBodyEl.appendChild(row);
  });
}
//Show all breeds
renderBreeds();

function renderBreeds() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
