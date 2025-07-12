// static/js/form.js

loadFromStorage();

const urlParams = new URLSearchParams(window.location.search);
const editId = +urlParams.get("editId");

const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const emailEl = document.getElementById("email");
const dept = document.getElementById("department");
const role = document.getElementById("role");
const form = document.getElementById("employee-form");
const cancelBtn = document.getElementById("cancel-btn");

if (editId) {
  const emp = getEmployeeById(editId);
  if (emp) {
    fName.value = emp.firstName;
    lName.value = emp.lastName;
    emailEl.value = emp.email;
    dept.value = emp.department;
    role.value = emp.role;
  }
}

form.onsubmit = (e) => {
  e.preventDefault();
  const data = {
    firstName: fName.value.trim(),
    lastName: lName.value.trim(),
    email: emailEl.value.trim(),
    department: dept.value.trim(),
    role: role.value.trim(),
  };
  if (Object.values(data).some((v) => !v)) return alert("All fields required.");
  if (!isValidEmail(data.email)) return alert("Invalid email");

  if (editId) updateEmployee(editId, data);
  else addEmployee(data);

  saveToStorage();
  window.location.href = "/dashboard.ftlh";
};

cancelBtn.onclick = () => (window.location.href = "/dashboard.ftlh");
