document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const tableBody = document.getElementById("employee-table-body");
  const addEmployeeBtn = document.getElementById("add-employee-btn");
  const modal = document.getElementById("employee-modal");
  const form = document.getElementById("employee-form");
  const cancelBtn = document.getElementById("cancel-form");
  const searchInput = document.getElementById("search");
  const deptFilter = document.getElementById("department-filter");
  const roleFilter = document.getElementById("role-filter");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");
  const resetFiltersBtn = document.getElementById("reset-filters");

  // Pagination
  let currentPage = 1;
  const employeesPerPage = 5;

  // Initial load
  initFilters();
  renderEmployees();

  // Event Listeners
  addEmployeeBtn.addEventListener("click", openAddForm);
  cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
  form.addEventListener("submit", handleFormSubmit);
  searchInput.addEventListener("input", renderEmployees);
  deptFilter.addEventListener("change", renderEmployees);
  roleFilter.addEventListener("change", renderEmployees);
  prevPageBtn.addEventListener("click", goToPrevPage);
  nextPageBtn.addEventListener("click", goToNextPage);
  resetFiltersBtn.addEventListener("click", resetAllFilters);

  // Initialize filter dropdowns
  function initFilters() {
    const departments = window.employeeAPI.getDepartments();
    const roles = window.employeeAPI.getRoles();

    // Clear existing options (keeping first empty option)
    deptFilter.innerHTML = '<option value="">All Departments</option>';
    roleFilter.innerHTML = '<option value="">All Roles</option>';

    departments.forEach((dept) => {
      deptFilter.add(new Option(dept, dept));
    });

    roles.forEach((role) => {
      roleFilter.add(new Option(role, role));
    });
  }

  // Render employees table
  function renderEmployees() {
    let employees = window.employeeAPI.getEmployees();
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDept = deptFilter.value;
    const selectedRole = roleFilter.value;

    // Filter employees
    employees = employees.filter((emp) => {
      const matchesSearch =
        emp.firstName.toLowerCase().includes(searchTerm) ||
        emp.lastName.toLowerCase().includes(searchTerm) ||
        emp.email.toLowerCase().includes(searchTerm);

      const matchesDept = selectedDept ? emp.department === selectedDept : true;
      const matchesRole = selectedRole ? emp.role === selectedRole : true;

      return matchesSearch && matchesDept && matchesRole;
    });

    // Pagination
    const totalPages = Math.ceil(employees.length / employeesPerPage);
    const paginatedEmployees = employees.slice(
      (currentPage - 1) * employeesPerPage,
      currentPage * employeesPerPage
    );

    // Update pagination UI
    updatePaginationUI(totalPages);

    // Render table
    renderTable(paginatedEmployees);
  }

  function updatePaginationUI(totalPages) {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
  }

  function renderTable(employees) {
    tableBody.innerHTML = employees
      .map(
        (emp) => `
      <tr>
        <td>${emp.firstName}</td>
        <td>${emp.lastName}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>
          <button class="btn-edit" data-id="${emp.id}">Edit</button>
          <button class="btn-delete" data-id="${emp.id}">Delete</button>
        </td>
      </tr>
    `
      )
      .join("");

    // Add event listeners to action buttons
    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () =>
        openEditForm(parseInt(btn.dataset.id))
      );
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () =>
        deleteEmployee(parseInt(btn.dataset.id))
      );
    });
  }

  function updateDropdown(id, options, defaultText = "Select") {
    const select = document.getElementById(id);
    const currentValue = select.value;

    select.innerHTML = `<option value="">${defaultText}</option>`;
    options.forEach((option) => {
      select.add(new Option(option, option));
    });

    // Restore selection if still valid
    if (currentValue && options.includes(currentValue)) {
      select.value = currentValue;
    }
  }

  function populateDropdowns() {
    // Get ALL possible options (master lists + any custom values)
    const allDepts = window.employeeAPI.getDepartments();
    const allRoles = window.employeeAPI.getRoles();

    // Update both form and filter dropdowns
    updateDropdown("department", allDepts);
    updateDropdown("role", allRoles);
    updateDropdown("department-filter", allDepts, "All Departments");
    updateDropdown("role-filter", allRoles, "All Roles");
  }

  // Form handling
  function openAddForm() {
    populateDropdowns();
    document.getElementById("form-title").textContent = "Add Employee";
    document.getElementById("employee-id").value = "";
    form.reset();
    modal.classList.remove("hidden");
  }

  function openEditForm(id) {
    populateDropdowns();
    const employee = window.employeeAPI.getEmployees().find((e) => e.id === id);
    if (employee) {
      document.getElementById("form-title").textContent = "Edit Employee";
      document.getElementById("employee-id").value = employee.id;
      document.getElementById("first-name").value = employee.firstName;
      document.getElementById("last-name").value = employee.lastName;
      document.getElementById("email").value = employee.email;
      document.getElementById("department").value = employee.department;
      document.getElementById("role").value = employee.role;
      modal.classList.remove("hidden");
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    clearErrorMessages();

    const formData = getFormData();
    if (!validateForm(formData)) return;

    if (formData.id) {
      updateExistingEmployee(formData);
    } else {
      createNewEmployee(formData);
    }
  }

  function getFormData() {
    return {
      id: document.getElementById("employee-id").value,
      firstName: document.getElementById("first-name").value.trim(),
      lastName: document.getElementById("last-name").value.trim(),
      email: document.getElementById("email").value.trim(),
      department: document.getElementById("department").value,
      role: document.getElementById("role").value,
    };
  }

  function clearErrorMessages() {
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
  }

  function validateForm(formData) {
    let isValid = true;

    if (!formData.firstName) {
      document.getElementById("first-name-error").textContent =
        "First name is required";
      isValid = false;
    }

    if (!formData.lastName) {
      document.getElementById("last-name-error").textContent =
        "Last name is required";
      isValid = false;
    }

    if (!formData.email) {
      document.getElementById("email-error").textContent = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      document.getElementById("email-error").textContent =
        "Invalid email format";
      isValid = false;
    }

    if (!formData.department) {
      document.getElementById("department-error").textContent =
        "Department is required";
      isValid = false;
    }

    if (!formData.role) {
      document.getElementById("role-error").textContent = "Role is required";
      isValid = false;
    }

    return isValid;
  }

  function updateExistingEmployee(employeeData) {
    employeeData.id = parseInt(employeeData.id);
    const success = window.employeeAPI.updateEmployee(employeeData);
    if (success) {
      showSuccess("Employee updated successfully");
    } else {
      document.getElementById("email-error").textContent =
        "Email already exists";
    }
  }

  function createNewEmployee(employeeData) {
    const newEmployee = window.employeeAPI.addEmployee(employeeData);
    if (newEmployee) {
      showSuccess("Employee added successfully");
    } else {
      document.getElementById("email-error").textContent =
        "Email already exists";
    }
  }

  function showSuccess(message) {
    alert(message);
    modal.classList.add("hidden");
    renderEmployees();
  }

  function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
      window.employeeAPI.deleteEmployee(id);
      renderEmployees();
    }
  }

  // Pagination functions
  function goToPrevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderEmployees();
    }
  }

  function goToNextPage() {
    const totalEmployees = window.employeeAPI.getEmployees().length;
    const totalPages = Math.ceil(totalEmployees / employeesPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      renderEmployees();
    }
  }

  function resetAllFilters() {
    // Reset inputs
    searchInput.value = "";
    deptFilter.value = "";
    roleFilter.value = "";

    // Reset pagination
    currentPage = 1;

    // Re-render
    renderEmployees();
  }
});
