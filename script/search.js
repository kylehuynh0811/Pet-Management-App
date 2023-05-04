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
const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");

//////////////////``
//Bắt sự kiện vào nút Find
// TÌm kiếm các thú cưng theo điều kiện nhập vào và hiển thị thông tin các thú cưng đáp ứng điều kiện đó

findBtn.addEventListener("click", function () {
  // Lưu ý 1: nếu người dùng không nhập các trường dữ liệu để tìm kiêm mà ấn submit
  // thì cũng hiển thị toàn bộ danh sách thu cưng
  // Lưu ý 2: nếu người dùng nhập nhiều truòng dữ liệu thì sẽ đưa ra kết quả
  // Nhập vào id thì tìm theo id

  let petArrFind = petArr;
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  // nếu nhập vào nam thì tìm theo name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  // Nếu chọn type thì tìm theo type
  if (typeInput.value !== "Select type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  // Nếu chọn breed thì tìm theo breed
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  // Nếu tích chọn vaccinatedInput
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  // Nếu tích chọn dewormedInput
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  // nếu tích chọn sterilizedInput
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }
  // Hiển thị các thú cưng thỏa điều kiện tìm kiếm

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
/// HIển thị các loại giống breed
renderBreed();
/////
// Hàm: hiển thị tất cả các giống breed
// Lưu ý tất cả các loại giống thú cưng: không phân biệt chó hay mèo
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
