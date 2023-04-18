"use strict";
//Toggle active class for sidebar Animation
const navEl = document.getElementById("sidebar");

navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

//Save to local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//get from local storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
