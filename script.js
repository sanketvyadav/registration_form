var student = [];

var dataForm = document.getElementById("studentForm");
var table = document.getElementById("studentTable");
var tbody = table.querySelector("tbody");


document.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var rollNo = document.getElementById("rollNo").value;
    var gender = getGender();
    var mob = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var age = document.getElementById("age").value;
    var mail = document.getElementById("mail").value;
    var country = document.getElementById("country").value;
    var subjects = getSelectedSubjects();
    var img = document.getElementById("img").files[0];


    var obj = { name, rollNo, gender, mob, date, age, mail, country, subjects, img: URL.createObjectURL(img) };
    student.push(obj);

    addData();
    dataForm.reset();

    document.getElementById('successMessage').style.display = 'block';

});

function addData() {
    tbody.innerHTML = "";

    student.forEach((element) => {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${element.name}</td>
            <td>${element.rollNo}</td>
            <td>${element.gender}</td>
            <td>${element.mob}</td>
            <td>${element.date}</td>
            <td>${element.age}</td>
            <td>${element.mail}</td>
            <td>${element.country}</td>
            <td>${element.subjects.join(', ')}</td>
            <td><img src="${element.img}" height="100" alt="student image"></td>
            <td><button onclick="editData(${student.indexOf(element)})">Edit</button></td>
            <td><button onclick="deleteData(${student.indexOf(element)})">Delete</button></td>
            `;
        tbody.appendChild(row);
    });

}

function editData(index) {
    var selectedStudent = student[index];

    document.getElementById("name").value = selectedStudent.name;
    document.getElementById("rollNo").value = selectedStudent.rollNo;

    var genderRadios = document.getElementsByName("gender");
    for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].value === selectedStudent.gender[0]) {
            genderRadios[i].checked = true;
        }
    }

    document.getElementById("phone").value = selectedStudent.mob;
    document.getElementById("date").value = selectedStudent.date;
    document.getElementById("age").value = selectedStudent.age;
    document.getElementById("mail").value = selectedStudent.mail;
    document.getElementById("country").value = selectedStudent.country;
    document.getElementById("img").value = "";
    student.splice(index, 1);
    addData();
}


function deleteData(index) {
    student.splice(index, 1);
    alert("Are you sure you want to delete this ROW? ");
    addData();
}


function getSelectedSubjects() {
    var subjects = [];
    var subject1 = document.getElementById("subject1");
    var subject2 = document.getElementById("subject2");
    var subject3 = document.getElementById("subject3");
    if (subject1.checked) {
        subjects.push(subject1.value);
    }
    if (subject2.checked) {
        subjects.push(subject2.value);
    }
    if (subject3.checked) {
        subjects.push(subject3.value);
    }
    return subjects;

}
function getGender() {
    var gender = [];
    var Male = document.getElementById("male");
    var Female = document.getElementById("female");
    var other = document.getElementById("other");
    if (male.checked) {
        gender.push(Male.value);
    }
    if (female.checked) {
        gender.push(Female.value);
    }
    if (other.checked) {
        gender.push(other.value);
    }
    return gender;
}

// function jsonObject() {
//     var jsonData = JSON.stringify(student);
//     document.getElementById("jsonData").textContent = jsonData;
// }


function downloadJson() {

    var jsonData = JSON.stringify(student);
    var blob = new Blob([jsonData], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "student_data.json";
    link.click();
    URL.revokeObjectURL(url);
}