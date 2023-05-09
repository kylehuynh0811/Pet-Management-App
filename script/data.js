"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

//Run when user click the " Export" button
btnExport.addEventListener("click", () => {
  const isExport = confirm("Are you sure you want to export ?");
  if (isExport) {
    //Save file
    saveStaticDatatoFile();
    alert("Successfully export data to your file ^^");
  }
});
//Export function
const saveStaticDatatoFile = () => {
  //create data for saving to the file
  const blob = new Blob(JSON.stringify[(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
};

//Run when user click Import" button
btnImport.addEventListener("click", () => {
  //Check if user selected a file to import or not
  if (!fileInput.value) {
    alert("Please select the file that you want to import !");
  } else {
    const isImport = confirm("Are you sure you want to import this file ?");
    if (isImport) {
      const file = fileInput.files[0];

      const reader = new FileReader();

      //Load data from the file
      reader.addEventListener(
        "load",
        () => {
          const isValidateFile = checkFile(JSON.parse(reader.result));
          if (isValidateFile) {
            //save data to localStorage
            saveToStorage("petArr", JSON.parse(reader.result));
            alert("Successfully import your file ^^");
          }
        },
        false
      );
      //Read the file as text
      if (file) {
        reader.readAsText(file);
      }
      //Reset the file input
      fileInput.value = "";
    }
  }
});
