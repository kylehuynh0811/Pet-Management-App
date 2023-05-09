"use strict";
function addSidebarAnimation() {
  const sidebar = document.getElementById("sidebar");
  sidebar.addEventListener("click", function (e) {
    //When user click on the linked icon, skip the animation and load the page
    let clicked = e.target.closest("a");
    if (clicked && clicked.tagName === "A") return;
    clicked = e.target.closest("nav");
    if (clicked.tagName !== "NAV") return;
    clicked.classList.toggle("active");
  });
}

addSidebarAnimation();

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
