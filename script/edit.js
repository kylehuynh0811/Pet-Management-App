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
                  <button type="button" class="btn btn-warning" onclick="deletePet('${
                    pet.id
                  }')">Edit</button>
                </td>`;
    tableBodyEl.appendChild(row);
  });
}
///////////////
// // Hàm sử lý khi người dùng nhấn vào các nhút Edit
// function editEvent() {
//   const editElList = document.querySelectorAll(".btn.btn-danger");
//   editElList.forEach((editEl) => {
//     // Sự kiện click vào nut edit
//     editEl.addEventListener("click", function () {
//       // Lấy id của thú cưng được edit
//       const id = editEl.parentElement.parentElement.children[0].innerHTML;
//       // Gọi hàm để edit
//       editPet(id);
//     });
//   });
// }
///////
// Hàm chỉnh sữa dữ liệu thông tin thú cưng
function editPet(id) {
  // HIện lại form nhập dữ liệu
  formEl.classList.remove("hide");
  // Tìm đến dữ liệu của thú cưng cần edit
  const pet = petArr.find((petItem) => petItem.id === id);
  // hiển thị những thông tin của thú cưng lên form nhập
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
  // để hiển thị đúng các loại giống cho từng loại dog-cat
  renderBreed();
  // hiển thị dữ liệu loại giống thú cưng( dữ liệu ban đầu trước khi edit)
  breedInput.value = `${pet.breed}`;
}

///////////////////
// Sự kiện nhấp chuột vào input sau đó hiển thị các loại giống đúng với từng loại DOg cat
typeInput.addEventListener("click", renderBreed);
////////////////
// Hfm hiển thị giống thú cưng theo từng loại nhất định
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    // Nếu là Cat
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

///////////////
// SỰ kiện ấn vào nút submit form
submitBtn.addEventListener("click", function () {
  // lấy dữ liệu từ form
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
  // validate dữ liệu hợp lệ
  const isValidate = validateData(data);

  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // Vẫn giữ ngày thêm thú cưng
    // data.date = petArr[index].date;
    // cập nhật lại dữ liệu của thú cưng đó
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    // Ẩn form đi và hiện lại bảng dữ liệu thú cưng
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

/////////////////
// validate dữ liệu hợp lệ
// Hàm này sẽ trả về true nếu dữ liệu hợp lệ, và false nếu dữ liệu không hợp lệ
let isValidate = true;
function validateData(data) {
  // Không có trường nào bị nhập thiếu dữ liệu
  // Khai báo biến cờ hiệu

  if (data.id.trim() === "") {
    alert("Emty value for ID");
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert("Emty value for Name");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Emty value for Age");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Emty value for Weight");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("Emty value for Length");
    isValidate = false;
  }

  // for (let i = 0; i < petArr.length; i++) {
  //   if (data.id == petArr[i].id) {
  //     alert("ID must unique");
  //     isValidate = false;
  //     break;
  //   }
  // }
  return isValidate;
}
