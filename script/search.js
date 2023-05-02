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
  console.log(petArr);
  for (let i = 0; i <= petArr.length; i++) {
    const row = document.createElement("tr");
    // var date = 1;
    var mydate = 1;
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
							<td>${petArr[i].name}</td>
							<td>${petArr[i].age}</td>
							<td>${petArr[i].type}</td>
							<td>${petArr[i].weight} kg</td>
							<td>${petArr[i].length} cm</td>
							<td>${petArr[i].breed}</td>
							<td>
								<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
							</td>
							<td><i class="bi ${
                petArr[i].vaccinated
                  ? "bi-check-circle-fill"
                  : "bi-x-circle-fill"
              }"></i></td>
							<td><i class="bi ${
                petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
              }"></i></td>
							<td><i class="bi ${
                petArr[i].sterilized
                  ? "bi-check-circle-fill"
                  : "bi-x-circle-fill"
              }"></i></td>
							<td>${mydate}</td>`;
    tableBodyEl.appendChild(row);
  }
}
/////
// Hàm hiển thị thời gian
function displayTim(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
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
