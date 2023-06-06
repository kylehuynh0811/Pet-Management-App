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
  var blob = new Blob([JSON.stringify(getFromStorage("petArr"),null,2)], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
};

//Run when user click Import" button
btnImport.addEventListener("click", () => {
  //Check if user selected a file to import or not
  if (!fileInput.value)  {
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

//Function to check the file structure
const checkFile = (data) => {
  //Check if the data user want to export is an array
  if (!(data instanceof Array)) {
    alert("Invalid file: the file does not contain an array that store objects")
    return false;
  }
  //Check if the data is a Pet object
  if (!isPetObject) {
    return false;
  }
  //Check if the data is in a valid format
  if (!isValidate) {
    alert("Invalid file: Objects in the file does not match the required format")
    return false;
  }

  return true;
}
//Check if the data is a Pet object
const isPetObject = (data) => {
  if(!data.every((item) => item instanceof Object)){
    alert("Invalid file: some elements in the array are not objects");
    return false;
  }
  //Check if any Object miss any properties
  const isOk = date.every((item) => {
    return (
      Object.keys(item).length === 12 &&
      item.hasOwnProperty("id") &&
      item.hasOwnProperty("name") &&
      item.hasOwnProperty("age") &&
      item.hasOwnProperty("type") &&
      item.hasOwnProperty("weight") &&
      item.hasOwnProperty("length") &&
      item.hasOwnProperty("color") &&
      item.hasOwnProperty("breed") &&
      item.hasOwnProperty("vaccinated") &&
      item.hasOwnProperty("dewormed") &&
      item.hasOwnProperty("sterilized") &&
      item.hasOwnProperty("date")
      );
  });

  if (!isOk){
    alert("Invalid file: an object contains invalid properties");
    return false;
  }

  return true;
}

const isValidate = (data) => {
  //Check for the validity of an object properties
  return data.every( (pet) => {
    if (pet.id.trim().length === 0){
      alert("Invalid file: File contain invalid ID");
      return false;
    }

    if (pet.name.trim().length === 0){
      alert("Invalid file: File contains invalid Name");
      return false;
    }

    pet.age = parseInt(pet.age)
    if (pet.age.trim().length === 0){
      alert("Invalid file: File contains invalid ID");
      return false;
    }

    pet.weight = parseInt(pet.weight)
    if (pet.weight.trim().length === 0){
      alert("Invalid file: File contains invalid Weight");
      return false;
    }

    pet.length = parseInt(pet.length)
    if (pet.length.trim().length === 0){
      alert("Invalid file: File contains invalid Length");
      return false;
    }

    if (pet.type.trim().length === 0){
      alert("Invalid file: File contains invalid Type");
      return false;
    }

    if (pet.color.trim().length=== 0){
      alert("Invalid file: File contains invalid Color");
      return false;
    }

    if (pet.breed.trim().length === 0){
      alert("Invalid file: File contains invalid Breed");
      return false;
    }

    if (pet.date.trim().length === 0){
      alert("Invalid file: File contains invalid Date");
      return false;
    }

    if (typeof pet.vaccinated !== 'boolean'){
      alert("Invalid file: File contain invalid Vaccinated");
      return false;
    }

    if (typeof pet.dewormed !== 'boolean'){
      alert("Invalid file: File contain invalid Dewormed");
      return false;
    }

    if (typeof pet.sterilized !== 'boolean'){
      alert("Invalid file: File contain invalid Sterilized");
      return false;
    }
    //Check IDs for uniqueness
    let count = 1;

    for (let item of data){
      if (pet.id === item.id){
        //Duplicated ID
        if (count > 1) {
          alert("Invalid file: One or some pet IDs are duplicated");
          return false;
        }
        count++;
      }
    }

    return true;
  }
  )
}
