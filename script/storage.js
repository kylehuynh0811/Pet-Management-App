"use strict";
function addSidebarAnimation() {
  const sidebar = document.getElementById("sidebar");
  sidebar.addEventListener("click", function (e) {
    //Nếu click nhằm phải đường link -> không hiện hiệu ứng để browser load page khác
    let clicked = e.target.closest("a");
    if (clicked && clicked.tagName === "A") return;
    clicked = e.target.closest("nav");
    if (clicked.tagName !== "NAV") return;
    clicked.classList.toggle("active");
    // if (e.target.tagName !== "NAV") return;
    // e.target.classList.toggle("active");
  });
}

addSidebarAnimation();
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
  id: "P001",
  name: "Jerry",
  age: 4,
  type: "Mouse",
  weight: 50,
  length: 500,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date().toLocaleDateString("vi-vn"),
};

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
/*
// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
//Lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [data1, data2]);
}
*/
