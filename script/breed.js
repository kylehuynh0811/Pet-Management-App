"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

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

if (!getFromStorage("breedArr")) {
  // gán dữ liệu để test
  saveToStorage("breedArr", [breed1, breed2, breed4]);
}
const breedArr = getFromStorage("breedArr");
// Hiển thị danh sách
renderTableBreed(breedArr);
// const breedArr = [];

// breedArr.push(breed1);
// breedArr.push(breed2);
// breedArr.push(breed4);


////////////
// Bắt sự kiện vào nút submit
btnSubmit.addEventListener("click", function () {
  //Lấy dữ liệu từ form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // Validate dữ liệu
  const isValidate = validate(data);
  if (isValidate) {
    // thêm dữ liệu vào các mảng Breed
    breedArr.push(data);
    // lưu dữ liệu lại(cập nhật dữ liệu)
    saveToStorage("breedArr", breedArr);
    // hiển thị lại bảng thông tin các Breed
    renderTableBreed(breedArr);
    // xóa thông tin từ form nhập
    deleteForm();
  }
});
function validate(data) {
  let isValidate = true;
  // Nếu nhập vào 1 chuỗi trống hoặc 1 chuỗi toàn khoảng trắng thì báo lỗi
  if (breedInput.value.trim().lenghth === 0) {
    alert("please input for breed !");
    isValidate = fasle;
  }
  // Bắt lỗi phải chọn type
  if (data.type === "Select Type") {
    alert("Please select Type !");
    isValidate = false;
  }
  return isValidate;
}

//////
// Hàm: xóa thông tin form
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}
/////////
// Hàm hiển thị thông tin các Breed lên bẳng
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";

  // cứ mỗi loại Breed ta sẽ thêm 1 dòng (row) dữ liệu vào bảng
  breedArr.forEach(function (breedItem, index) {
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
//Hàm xóa các breed
function deleteBreed(breed) {
  // xác nhận xóa
  const isDelete = confirm("Are you sure?");
  if (isDelete) {
    // Thức hiện bước xóa trong này
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        // XÓa khỏi mảng
        breedArr.splice(i, 1);
        // Cập nhật lại dữ liệu dưới dạng local storage
        saveToStorage("breedArr", breedArr);
        // Gọi lại hàm hiển thị
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
