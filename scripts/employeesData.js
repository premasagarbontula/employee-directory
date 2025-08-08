const MASTER_DEPARTMENTS = [
  "HR",
  "IT",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "Engineering",
];

const MASTER_ROLES = [
  "HR Manager",
  "Senior Developer",
  "Financial Analyst",
  "Marketing Director",
  "Account Executive",
  "DevOps Engineer",
  "Talent Acquisition",
  "Senior Analyst",
  "Operations Manager",
  "Systems Administrator",
  "Support Lead",
  "Product Owner",
];

// Sample data to load if empty
const sampleEmployees = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    department: "HR",
    role: "HR Manager",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "b.johnson@example.com",
    department: "Engineering",
    role: "Senior Developer",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Lee",
    email: "charlie.lee@example.com",
    department: "Finance",
    role: "Financial Analyst",
  },
  {
    id: 4,
    firstName: "Diana",
    lastName: "Brown",
    email: "diana.b@example.com",
    department: "Marketing",
    role: "Marketing Director",
  },
  {
    id: 5,
    firstName: "Eve",
    lastName: "Davis",
    email: "e.davis@example.com",
    department: "Sales",
    role: "Account Executive",
  },
  {
    id: 6,
    firstName: "Frank",
    lastName: "Wilson",
    email: "frank.w@example.com",
    department: "Engineering",
    role: "DevOps Engineer",
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Martinez",
    email: "g.martinez@example.com",
    department: "HR",
    role: "Talent Acquisition",
  },
  {
    id: 8,
    firstName: "Henry",
    lastName: "Garcia",
    email: "henry.g@example.com",
    department: "Finance",
    role: "Senior Analyst",
  },
  {
    id: 9,
    firstName: "Ivy",
    lastName: "Chen",
    email: "ivy.chen@example.com",
    department: "Operations",
    role: "Operations Manager",
  },
  {
    id: 10,
    firstName: "Jack",
    lastName: "Williams",
    email: "jack.w@example.com",
    department: "IT",
    role: "Systems Administrator",
  },
  {
    id: 11,
    firstName: "Karen",
    lastName: "Taylor",
    email: "karen.t@example.com",
    department: "Customer Support",
    role: "Support Lead",
  },
  {
    id: 12,
    firstName: "Liam",
    lastName: "Nguyen",
    email: "liam.n@example.com",
    department: "Product",
    role: "Product Owner",
  },
];

let employees = JSON.parse(localStorage.getItem("employees")) || [];

function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function generateId() {
  return employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
}

window.employeeAPI = {
  getEmployees: () => employees,

  addEmployee: (employee) => {
    const isDuplicate = employees.some(
      (e) => e.email.toLowerCase() === employee.email.toLowerCase()
    );
    if (isDuplicate) return null;

    const newEmployee = { ...employee, id: generateId() };
    employees.push(newEmployee);
    saveEmployees();
    return newEmployee;
  },

  updateEmployee: (updatedEmployee) => {
    const isDuplicate = employees.some(
      (e) =>
        e.email.toLowerCase() === updatedEmployee.email.toLowerCase() &&
        e.id !== updatedEmployee.id
    );
    if (isDuplicate) return false;

    const index = employees.findIndex((e) => e.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      saveEmployees();
      return true;
    }
    return false;
  },

  deleteEmployee: (id) => {
    employees = employees.filter((e) => e.id !== id);
    saveEmployees();
  },

  // Always combine master lists with any custom values from employees
  getDepartments: () => [
    ...new Set([
      ...MASTER_DEPARTMENTS,
      ...employees.map((e) => e.department).filter(Boolean),
    ]),
  ],

  getRoles: () => [
    ...new Set([
      ...MASTER_ROLES,
      ...employees.map((e) => e.role).filter(Boolean),
    ]),
  ],

  // Initialize with sample data if empty
  initData: () => {
    if (employees.length === 0) {
      employees = [...sampleEmployees];
      saveEmployees();
    }
  },
};

// Initialize data on load
window.employeeAPI.initData();
