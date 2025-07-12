document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const employeeListContainer = document.querySelector(
    ".employee-list-container"
  );
  const searchInput = document.getElementById("search-input");
  const addEmployeeBtn = document.getElementById("add-employee-btn");
  const filterBtn = document.getElementById("filter-btn");
  const filterPanel = document.getElementById("filter-panel");
  const applyFiltersBtn = document.getElementById("apply-filters");
  const resetFiltersBtn = document.getElementById("reset-filters");
  const firstNameFilter = document.getElementById("first-name-filter");
  const departmentFilter = document.getElementById("department-filter");
  const roleFilter = document.getElementById("role-filter");
  const sortField = document.getElementById("sort-field");
  const sortDirection = document.getElementById("sort-direction");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageInfo = document.getElementById("page-info");
  const pageSize = document.getElementById("page-size");
  const modal = document.getElementById("employee-form-modal");
  const closeBtn = document.querySelector(".close-btn");

  // State
  let currentPage = 1;
  let itemsPerPage = parseInt(pageSize.value);
  let currentFilters = {};
  let currentSort = { field: "firstName", direction: "asc" }; // Default sorting configuration

  // Initialize
  renderEmployees();

  // Event Listeners
  addEmployeeBtn.addEventListener("click", showAddForm);
  filterBtn.addEventListener("click", toggleFilters);
  applyFiltersBtn.addEventListener("click", applyFilters);
  resetFiltersBtn.addEventListener("click", resetFilters);
  searchInput.addEventListener("input", handleSearch);
  sortField.addEventListener("change", updateSort);
  sortDirection.addEventListener("change", updateSort);
  prevPageBtn.addEventListener("click", goToPrevPage);
  nextPageBtn.addEventListener("click", goToNextPage);
  pageSize.addEventListener("change", handlePageSizeChange);
  closeBtn.addEventListener("click", closeModal);

  // Listen for employee updates
  document.addEventListener("employeeUpdated", renderEmployees);

  // Delegated event listeners for dynamic elements
  employeeListContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const id = parseInt(e.target.dataset.id);
      showEditForm(id);
    }

    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.dataset.id);
      deleteEmployeeHandler(id);
    }
  });

  // Functions
  // Main render function that handles the employee list display
  function renderEmployees() {
    // Get all employees and apply filters, sorting, and pagination in sequence
    const allEmployees = window.employeeData.getEmployees();
    const filteredEmployees = window.employeeData.filterEmployees(
      allEmployees,
      currentFilters
    );
    const sortedEmployees = window.employeeData.sortEmployees(
      filteredEmployees,
      currentSort
    );
    const paginatedEmployees = window.employeeData.paginateEmployees(
      sortedEmployees,
      currentPage,
      itemsPerPage
    );

    renderEmployeeList(paginatedEmployees);
    updatePaginationControls(filteredEmployees.length);
  }

  // Renders individual employee cards with their information and action buttons
  function renderEmployeeList(employees) {
    employeeListContainer.innerHTML = employees
      .map(
        (employee) => `
        <div class="employee-card" data-id="${employee.id}">
          <div class="employee-info">
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <p><strong>Email:</strong> ${employee.email}</p>
            <div class="employee-meta">
              <span class="badge">${employee.department}</span>
              <span class="badge">${employee.role}</span>
            </div>
          </div>
          <div class="employee-actions">
            <button class="btn btn-secondary edit-btn" data-id="${employee.id}">Edit</button>
            <button class="btn btn-danger delete-btn" data-id="${employee.id}">Delete</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  // Updates the pagination UI based on current page and total items
  function updatePaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    // Disable pagination buttons when at the limits
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;

    // Update visual state of pagination buttons
    prevPageBtn.classList.toggle("disabled", currentPage <= 1);
    nextPageBtn.classList.toggle("disabled", currentPage >= totalPages);
  }

  // Modal form handlers for adding and editing employees
  function showAddForm() {
    // Reset form for new employee entry
    document.getElementById("form-title").textContent = "Add Employee";
    document.getElementById("employee-id").value = "";
    document.getElementById("employee-form").reset();
    modal.classList.remove("hidden");
  }

  function showEditForm(id) {
    // Populate form with existing employee data for editing
    const employee = window.employeeData
      .getEmployees()
      .find((e) => e.id === id);
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

  function deleteEmployeeHandler(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
      window.employeeData.deleteEmployee(id);
      // Force immediate re-render
      renderEmployees();
      // Show notification
      showNotification("Employee deleted successfully", "success");
      // Dispatch event for other components
      document.dispatchEvent(new CustomEvent("employeeUpdated"));
    }
  }

  function toggleFilters() {
    filterPanel.classList.toggle("hidden");
  }

  // Filter panel operations
  function applyFilters() {
    // Collect all filter values and update the employee list
    currentFilters = {
      firstName: firstNameFilter.value || null,
      department: departmentFilter.value || null,
      role: roleFilter.value || null,
      search: searchInput.value || null,
    };
    currentPage = 1; // Reset to first page when filters change
    renderEmployees();
    filterPanel.classList.add("hidden");
  }

  function resetFilters() {
    // Clear all filter inputs and reset to default state
    firstNameFilter.value = "";
    departmentFilter.value = "";
    roleFilter.value = "";
    searchInput.value = "";
    currentFilters = {};
    currentPage = 1;
    renderEmployees();
    filterPanel.classList.add("hidden");
  }

  function handleSearch(e) {
    currentFilters.search = e.target.value;
    currentPage = 1;
    renderEmployees();
  }

  function updateSort() {
    currentSort = {
      field: sortField.value,
      direction: sortDirection.value,
    };
    renderEmployees();
  }

  // Pagination handlers
  function goToPrevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderEmployees();
    }
  }

  function goToNextPage() {
    // Calculate total pages based on filtered results
    const filteredEmployees = window.employeeData.filterEmployees(
      window.employeeData.getEmployees(),
      currentFilters
    );
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      renderEmployees();
    }
  }

  function handlePageSizeChange(e) {
    // Update items per page and reset to first page
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderEmployees();
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  // Make renderEmployees available globally for external updates
  window.renderEmployees = renderEmployees;
});
