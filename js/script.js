// CRUD
// Create   Retrive   Update   Delete   , Search

var firstName = document.getElementById("firstName");
var secondName = document.getElementById("secondName");
var email = document.getElementById("email");
var phoneNumber = document.getElementById("phoneNumber");
var location1 = document.getElementById("location1");
var hobby = document.getElementById("hobby");
var searchInput = document.getElementById("search");
var title = document.querySelector(".title");
var idNum;
var userInfo;

if (localStorage.getItem("info") === null) {
  userInfo = JSON.parse(localStorage.getItem("info"));
  displayUser(userInfo);
} else {
  userInfo = [
    {
      firstName: "l",
      secondName: "dsd",
      email: "sdd@dsd.com",
      phoneNumber: "21213",
      location1: "dsd",
      hobby: "sdsd",
    },
    {
      firstName: "lll",
      secondName: "dsd",
      email: "sdd@dsd.com",
      phoneNumber: "21213",
      location1: "dsd",
      hobby: "sdsd",
    },
    {
      firstName: "lll",
      secondName: "dsd",
      email: "sdd@dsd.com",
      phoneNumber: "21213",
      location1: "dsd",
      hobby: "sdsd",
    },
  ];
}

function addUser() {
  var user = {
    first: firstName.value,
    second: secondName.value,
    emailInput: email.value,
    phone: phoneNumber.value,
    locationInput: location1.value,
    hobbyInput: hobby.value,
  };
  if (
    firstName.value != "" &&
    secondName.value != "" &&
    email.value != "" &&
    phoneNumber.value != "" &&
    location1.value != "" &&
    hobby.value != ""
  ) {
    userInfo.push(user);
    localStorage.setItem("info", JSON.stringify(userInfo));
    displayUser(userInfo);
    clearForm();
  } else {
    window.alert("Error, Please enter data!");
  }
}

function displayUser(anArray) {
  var content = "";

  for (i = 0; i < anArray.length; i++) {
    content += `    <td>${i}</td>
      <td>${anArray[i].first}</td>
      <td>${anArray[i].second}</td>
      <td>${anArray[i].emailInput}</td>
      <td>${anArray[i].phoneNumber}</td>
      <td>${anArray[i].locationInput}</td>
      <td>${anArray[i].hobbyInput}</td>
      <td><button class="btn btn-warning" onClick="updateUser(${i})">Update</button>
      <button class="btn btn-danger" onClick="deleteUser(${i})">Delete</button>
      </td>
   
      </tr>`;
  }

  document.getElementById("tableBody").innerHTML = content;
}

function clearForm() {
  firstName.value = "";
  secondName.value = "";
  email.value = "";
  phoneNumber.value = "";
  location1.value = "";
  hobby.value = "";
}

//

// delete

function deleteUser(index) {
  userInfo.splice(index, 1);
  localStorage.setItem("info", JSON.stringify(userInfo));
  displayUser(userInfo);
}

// update
function updateUser(index) {
  idNum = index;
  title.innerHTML = "Update";

  firstName.value = userInfo[index].first;
  secondName.value = userInfo[index].second;
  email.value = userInfo[index].emailInput;
  phoneNumber.value = userInfo[index].phone;
  location1.value = userInfo[index].locationInput;
  hobby.value = userInfo[index].hobbyInput;
}

// Real time search
function searchUser() {
  var word = searchInput.value;

  var newUsers = [];
  for (var i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].firstName
        .toLocaleLowerCase()
        .includes(word.toLocaleLowerCase())
    ) {
      newUsers.push(userInfo[i]);
    }
  }

  displayUser(newUsers);
  document.getElementById("tableBody").innerHTML = content;
}

searchUser();
