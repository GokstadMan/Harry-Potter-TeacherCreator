let array = [];
let staffArray = [];

async function fetchStaff() {
  let response = await fetch("http://hp-api.herokuapp.com/api/characters"); // or API as defined
  let data = await response.json();
  array.push(data);

  // filtrate  staff in own array: staffArray
  data.filter((staff) => {
    if (staff.hogwartsStaff == true) {
      staffArray.push(staff);
      console.log(staffArray);
    }
  });
  showStaffCards(staffArray);
}

// show staffmembers by name,pic and house,patronus hidden.

function showStaffCards(staffArray) {
  let staffContainer = document.getElementById("staff-container");
  staffContainer.innerHTML = "";
  for (let i = 0; i < staffArray.length; i++) {
    let div = document.createElement("div");
    div.classList.add("staff-card");

    let img = document.createElement("img");
    img.classList.add("staff-img");
    img.src = staffArray[i].image;
    if (staffArray[i].image === "") {
      img.src = staffArray[i].image = "./images/avatar.jpg";
    }

    let staffName = document.createElement("h4");
    staffName.innerText = staffArray[i].name;

    let staffHouse = document.createElement("p");
    staffHouse.innerText = staffArray[i].house;
    if (staffArray[i].house === "") {
      staffHouse.innerText = "Intet hus funnet";
    }
    // styling houses:
    if (staffArray[i].house === "Slytherin") {
      div.style.backgroundColor = "rgb(107, 230, 134)";
    } else if (staffArray[i].house === "Gryffindor") {
      div.style.backgroundColor = "rgb(151, 184, 226)";
    } else if (staffArray[i].house === "Hufflepuff") {
      div.style.backgroundColor = "rgb(231, 168, 226)";
    } else if (staffArray[i].house === "Ravenclaw") {
      div.style.backgroundColor = "rgb(231, 202, 140)";
    } else {
      div.style.backgroundColor = "rgb(135, 141, 164)";
    }

    let patronusVar = document.createElement("p");
    patronusVar.innerText = staffArray[i].patronus;
    if (staffArray[i].patronus === "") {
      patronusVar.innerText = "Ingen patronus";
    }

    // delete-button:
    let deleteStaff = document.createElement("button");
    deleteStaff.innerText = "Slett lærer";
    deleteStaff.classList.add("delete-btn");
    deleteStaff.addEventListener("click", function () {
      deleteStaffMember(staffArray, i);
    });

    // edit-button:
    let editStaff = document.createElement("button");
    editStaff.innerText = "Endre lærer";
    editStaff.classList.add("edit-btn");
    editStaff.addEventListener("click", function () {
      editStaffMember(staffArray, i);
    });
    div.append(staffName, img, staffHouse, patronusVar, deleteStaff, editStaff);
    staffContainer.append(div);
  }
}

// delete staff-member:

function deleteStaffMember(staffArray, i) {
  let answer = prompt("Ønsker du å slette?(ja/nei)");
  if (answer === "ja") {
    staffArray.splice(i, 1);
    showStaffCards(staffArray);
  }
  return staffArray;
}

// edit staff-member:

function editStaffMember(staffArray, i) {
  let editedName = prompt("Nytt navn ?");
  let editedHouse = prompt("Nytt hus ?");
  let editedPatronus = prompt("Ny patronus ?");
  let newImage = "./images/avatar.jpg";

  if (editedName == "" || editedHouse == "" || editedPatronus == "") {
    alert("Husk alle felter må fylles ut!");
    return;
  } else {
    staffArray[i] = {
      name: editedName,
      image: newImage,
      house: editedHouse,
      patronus: editedPatronus,
    };
  }
  let answer = prompt("Ønsker du virkelig å endre ansatt? (ja/nei)");
  if (answer === "ja") {
    showStaffCards(staffArray);
  }
}

// create new staff-member:

function createStaffMember() {
  let staffName = document.getElementById("staff-name").value;
  let staffHouse = document.getElementById("staff-house").value;
  let staffPatronus = document.getElementById("staff-patronus").value;
  let newImage = "./images/avatar.jpg";

  if (staffName == "" || staffHouse == "" || staffPatronus == "") {
    alert("Husk alle felter må fylles ut!");
    return;
  } else {
    staffArray.push({
      name: staffName,
      image: newImage,
      house: staffHouse,
      patronus: staffPatronus,
    });
  }

  let answer = prompt("Ønsker du å lagre ansatt? (ja/nei)");
  if (answer === "ja") {
    showStaffCards(staffArray);
  }
}

let addstaffBtn = document.getElementById("add-staff-btn");
addstaffBtn.addEventListener("click", createStaffMember);

fetchStaff();
showStaffCards;
