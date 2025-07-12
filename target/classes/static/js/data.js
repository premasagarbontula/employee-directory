// Load employees from localStorage or initialize with empty array
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Populate with sample data if no existing records
if (employees.length === 0) {
  employees = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      department: "HR",
      role: "Manager",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      department: "IT",
      role: "Developer",
    },
    {
      id: 3,
      firstName: "Charlie",
      lastName: "Lee",
      email: "charlie@example.com",
      department: "Finance",
      role: "Analyst",
    },
    {
      id: 4,
      firstName: "Diana",
      lastName: "Brown",
      email: "diana@example.com",
      department: "Marketing",
      role: "Executive",
    },
    {
      id: 5,
      firstName: "Eve",
      lastName: "Davis",
      email: "eve@example.com",
      department: "Sales",
      role: "Sales Representative",
    },
    {
      id: 6,
      firstName: "Frank",
      lastName: "Wilson",
      email: "frank@example.com",
      department: "IT",
      role: "Developer",
    },
    {
      id: 7,
      firstName: "Grace",
      lastName: "Martinez",
      email: "grace@example.com",
      department: "HR",
      role: "Recruiter",
    },
    {
      id: 8,
      firstName: "Henry",
      lastName: "Garcia",
      email: "henry@example.com",
      department: "Finance",
      role: "Analyst",
    },
  ];
  saveEmployees();
}

// Extract unique departments and roles for dropdown filters
const departments = [...new Set(employees.map((e) => e.department))];
const roles = [...new Set(employees.map((e) => e.role))];

/**
 * Persists employees array to localStorage
 */
function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

/**
 * Generates a unique ID for new employees
 * @returns {number} New unique ID
 */
function generateId() {
  return employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
}

// CRUD Operations

/**
 * Returns the complete list of employees
 * @returns {Array} Array of employee objects
 */
function getEmployees() {
  return employees;
}

/**
 * Adds a new employee after validating email uniqueness
 * @param {Object} employee - Employee object without ID
 * @returns {Object|null} New employee object with ID or null if email exists
 */
function addEmployee(employee) {
  // Check for duplicate email addresses (case-insensitive)
  const isDuplicate = getEmployees().some(
    (e) => e.email.toLowerCase() === employee.email.toLowerCase()
  );

  if (isDuplicate) {
    console.error("Cannot add employee: Email already exists");
    return null;
  }

  const newEmployee = {
    ...employee,
    id: generateId(),
  };
  employees.push(newEmployee);
  saveEmployees();
  return newEmployee;
}

/**
 * Updates existing employee after validating email uniqueness
 * @param {Object} updatedEmployee - Employee object with ID
 * @returns {boolean} Success status of update operation
 */
function updateEmployee(updatedEmployee) {
  // Check for duplicate email addresses, excluding current employee
  const isDuplicate = getEmployees().some(
    (e) =>
      e.email.toLowerCase() === updatedEmployee.email.toLowerCase() &&
      e.id !== updatedEmployee.id
  );

  if (isDuplicate) {
    console.error("Cannot update employee: Email already exists");
    return false;
  }

  const index = employees.findIndex((e) => e.id === updatedEmployee.id);
  if (index !== -1) {
    employees[index] = updatedEmployee;
    saveEmployees();
    return true;
  }
  return false;
}

/**
 * Deletes employee by ID
 * @param {number} id - Employee ID to delete
 */
function deleteEmployee(id) {
  employees = employees.filter((e) => e.id !== id);
  saveEmployees();
}

// Data manipulation functions

/**
 * Filters employees based on multiple criteria
 * @param {Array} employees - Array of employees to filter
 * @param {Object} filters - Filter criteria object
 * @returns {Array} Filtered employees array
 */
function filterEmployees(employees, filters) {
  return employees.filter((employee) => {
    // Apply all active filters (firstName, department, role, search)
    return (
      (!filters.firstName ||
        employee.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase())) &&
      (!filters.department || employee.department === filters.department) &&
      (!filters.role || employee.role === filters.role) &&
      (!filters.search ||
        // Search across firstName, lastName, and email
        employee.firstName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        employee.lastName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        employee.email.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });
}

/**
 * Sorts employees by specified field and direction
 * @param {Array} employees - Array of employees to sort
 * @param {Object} sortConfig - Sorting configuration {field, direction}
 * @returns {Array} Sorted employees array
 */
function sortEmployees(employees, sortConfig) {
  return [...employees].sort((a, b) => {
    const fieldA = a[sortConfig.field].toLowerCase();
    const fieldB = b[sortConfig.field].toLowerCase();

    if (fieldA < fieldB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Paginates employee list
 * @param {Array} employees - Array of employees to paginate
 * @param {number} page - Current page number
 * @param {number} perPage - Items per page
 * @returns {Array} Paginated subset of employees
 */
function paginateEmployees(employees, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return employees.slice(start, end);
}

// Expose functions and data to global scope
window.employeeData = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  filterEmployees,
  sortEmployees,
  paginateEmployees,
  departments,
  roles,
};
