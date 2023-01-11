// CRUD App using vanilla js
// Create   Retrieve   Update   Delete   , Search

/* -------------------------- */
var firstName = document.getElementById("firstName");
var secondName = document.getElementById("secondName");
var email = document.getElementById("email");
var title = document.querySelector(".title");
var searchInput = document.getElementById("search");
var idNum;
var userInfo;
userInfo = JSON.parse(localStorage.getItem("info"));
displayUser(userInfo);
function addUser() {
  var user = {
    first: firstName.value,
    second: secondName.value,
    emailInput: email.value,
  };
  if (firstName.value != "" && secondName.value != "" && email.value != "") {
    userInfo.push(user);
    localStorage.setItem("info", JSON.stringify(userInfo));
    displayUser(userInfo);
    clearForm();
  } else {
    
    window.alert("Error, Please Enter data!");
  }
}

function displayUser(anArray) {
  var content = "";
  for (var i = 0; i < anArray.length; i++) {
    content += `<tr><td>${i}</td>
    <td>${anArray[i].first}</td>
    <td>${anArray[i].second}</td>
    <td>${anArray[i].emailInput}</td>
    <td><button class="btn btn-warning" onClick="updateUser(${i})">Update</button></td>
    <td><button class="btn btn-danger" onClick="deleteUser(${i})">Delete</button></td>
    
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = content;
}
// Delete
function deleteUser(index) {
  userInfo.splice(index, 1);
  localStorage.setItem("info", JSON.stringify(userInfo));
  displayUser(userInfo);
}

// Update
function updateUser(index) {
  idNum = index;
  title.innerHTML = "Update";
  firstName.value = userInfo[index].first;
  secondName.value = userInfo[index].second;
  email.value = userInfo[index].emailInput;
}
// clear form
function clearForm() {
  firstName.value = "";
  secondName.value = "";
  email.value = "";
}
// real time search

function searchUser() {
  var word = searchInput.value;

  var newUsers = [];
  for (var i = 0; i < userInfo.length; i++) {
    if (
      userInfo[i].first.toLocaleLowerCase().includes(word.toLocaleLowerCase())
    ) {
      newUsers.push(userInfo[i]);
    }
  }

  displayUser(newUsers);
  document.getElementById("tableBody").innerHTML = first;
}

searchUser();
// CSV Section
function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  //define the file type to text/csv
  csvFile = new Blob([csv], { type: "text/csv" });
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
}

//user-defined function to export the data to CSV file format
function exportTableToCSV(filename) {
  //declare a JavaScript variable of array type
  var csv = [];
  var rows = document.querySelectorAll("table tr");

  //merge the whole data in tabular form
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length-2; j++) {
      row.push(cols[j].innerText);
    }
    csv.push(row.join(","));
  }
  //call the function to download the CSV file
  downloadCSV(csv.join("\n"), filename);
}
