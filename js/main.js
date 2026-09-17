let studentId = document.getElementById("student-id");
let studentFirst = document.getElementById("student-first");
let studentLast = document.getElementById("student-last");
let studentGrade = document.getElementById("student-grade");
let studentSubject = document.getElementById("student-subject");
let submitBtn = document.getElementById("submit-Btn");
let tableBody = document.getElementById("table-body");
let totalStudents = document.getElementById("total-students");
let passedStudents = document.getElementById("passed-students");
let failedStudents = document.getElementById("failed-students");
let searchInput = document.getElementById("search-input");

let students = [];
submitBtn.addEventListener("click", function () {
  //validation

  if (
    studentId.value === "" ||
    studentFirst.value === "" ||
    studentGrade.value === "" ||
    studentLast.value === "" ||
    studentSubject.value === ""
  ) {
    alert("Please Fill All Fields");
    return;
  }

  if (editIndex === -1) {
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === studentId.value) {
        alert("ID Already Exists");
        return;
      }
    }
  }

  if (studentFirst.value.length < 3) {
    alert("First Name Must Be At Least 3 Characters");
    return;
  }

  if (studentLast.value.length < 3) {
    alert("Last Name Must Be At Least 3 Characters");
    return;
  }
  let grade = Number(studentGrade.value);

  if (grade < 0 || grade > 100) {
    alert("Grade Must Be Between 0 And 100");
    return;
  }

  let student = {
    id: studentId.value,
    firstName: studentFirst.value,
    lastName: studentLast.value,
    grade: studentGrade.value,
    subjects: studentSubject.value,
  };

  // لو مفيش تعديل يبقى أضف طالب جديد

  if (editIndex === -1) {
    students.push(student);
  }
  // لو فيه تعديل
  else {
    students[editIndex] = student; // ← عدل الطالب بدل ما تضيف واحد جديد
    editIndex = -1; // ← رجع للوضع الطبيعي
  }
  displayStudents();
  updateStatistics();
  clearInputs();
});
function updateStatistics() {
  totalStudents.textContent = students.length;

  let pass = 0;
  let fail = 0;

  for (let i = 0; i < students.length; i++) {
    if (Number(students[i].grade) >= 50) {
      pass++;
    } else {
      fail++;
    }
  }

  failedStudents.textContent = fail;
  passedStudents.textContent = pass;
}

function displayStudents() {
  // 1- امسحي الجدول الأول
  tableBody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    let rowClass = "";

    if (Number(students[i].grade) >= 50) {
      rowClass = "passed-row";
    } else {
      rowClass = "failed-row";
    }
    tableBody.innerHTML += `
            <tr class="${rowClass}">
                <td>${students[i].id}</td>
                <td>${students[i].firstName}</td>
                <td>${students[i].lastName}</td>
                <td>${students[i].grade}</td>
                <td>${students[i].subjects}</td>
                <td>
                <button onclick="editStudent(${i})" class="btn btn-warning btn-sm" >Edit</button>
                <button onclick="deleteStudent(${i})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
  }
}
function deleteStudent(i) {
  students.splice(i, 1);
  displayStudents();
  updateStatistics();
}

let editIndex = -1;
function editStudent(i) {
  let student = students[i];
  editIndex = i;
  studentId.value = student.id;
  studentFirst.value = student.firstName;
  studentLast.value = student.lastName;
  studentGrade.value = student.grade;
  studentSubject.value = student.subjects;
}

function clearInputs() {
  studentId.value = "";
  studentFirst.value = "";
  studentLast.value = "";
  studentGrade.value = "";
  studentSubject.value = "";
}

searchInput.addEventListener("input", function () {
  tableBody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    let rowClass = "";

    if (Number(students[i].grade) >= 50) {
      rowClass = "passed-row";
    } else {
      rowClass = "failed-row";
    }

    if (
      students[i].firstName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      tableBody.innerHTML += `
        <tr class="${rowClass}">
          <td>${students[i].id}</td>
          <td>${students[i].firstName}</td>
          <td>${students[i].lastName}</td>
          <td>${students[i].grade}</td>
          <td>${students[i].subjects}</td>
          <td>
            <button onclick="editStudent(${i})" class="btn btn-warning btn-sm">Edit</button>
            <button onclick="deleteStudent(${i})" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      `;
    }
  }
});
