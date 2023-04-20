"use strict";
// Khai báo trước dữ liệu data 1 và 2
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
  date: new Date(2022, 2, 1),
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
  date: new Date(2022, 2, 1),
};
// 1 Lấy dữ liệu từ các form Input

// Dorm element

const petArr = [];
petArr.push(data1);
petArr.push(data2);

renderTableData(petArr);
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  console.log(petArr);
  for (let i = 0; i <= petArr.length; i++) {
    const row = document.createElement("tr");
    var date = new Date(petArr[i].date);
    var mydate = date.toLocaleDateString();
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
							<td>${mydate}</td>
							<td>
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
</td>
              `;

    tableBodyEl.appendChild(row);
  }
}
