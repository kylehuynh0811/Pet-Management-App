"use strict";

//////////////////
//Bắt sự kiện vào nút Find
// TÌm kiếm các thú cưng theo điều kiện nhập vào và hiển thị thông tin các thú cưng đáp ứng điều kiện đó
const findBtn = document.getElementById("find-btn");
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

/////////////
// Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  // Xóa nội dung hiện có của bảng
  tableBodyEl.innerHTML = "";
  // VỚi mỗi thú cưng có trong dãy petArr --> ta tạo 1 hàng chứa dữ liệu
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} kg</td>
    <td>${pet.length} cm</td>
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
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
    <td>
</td>`;
    `;
  `;
    tableBodyEl.appendChild(row);
  });
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
