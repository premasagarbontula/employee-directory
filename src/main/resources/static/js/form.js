document.addEventListener("DOMContentLoaded", () => {
  // DOM Element references
  const form = document.getElementById("employee-form");
  const saveBtn = document.getElementById("save-employee");
  const cancelBtn = document.getElementById("cancel-form");
  const modal = document.getElementById("employee-form-modal");

  // Event listeners for form submission and cancellation
  form.addEventListener("submit", handleFormSubmit);
  cancelBtn.addEventListener("click", cancelForm);

  /**
   * Handles form submission for both adding and editing employees
   * @param {Event} e - Form submission event
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      // Collect form data into employee object
      const employeeData = {
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value,
        role: document.getElementById("role").value,
      };

      const employeeId = document.getElementById("employee-id").value;

      if (employeeId) {
        // Update existing employee flow
        employeeData.id = parseInt(employeeId);
        const success = window.employeeData.updateEmployee(employeeData);
        handleOperationResult(success, "update");
      } else {
        // Add new employee flow
        const newEmployee = window.employeeData.addEmployee(employeeData);
        handleOperationResult(newEmployee, "add");
      }
    }
  }

  /**
   * Validates all form fields and displays appropriate error messages
   * @returns {boolean} True if form is valid, false otherwise
   */
  function validateForm() {
    let isValid = true;
    // Get all form field values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const role = document.getElementById("role").value;
    const employeeId = document.getElementById("employee-id").value;

    // Clear any existing error messages
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });

    // Validate each field and display appropriate error messages
    if (!firstName) {
      document.getElementById("first-name-error").textContent =
        "First name is required";
      isValid = false;
    }

    // Validate last name
    if (!lastName) {
      document.getElementById("last-name-error").textContent =
        "Last name is required";
      isValid = false;
    }

    // Validate email
    if (!email) {
      document.getElementById("email-error").textContent = "Email is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email";
      isValid = false;
    } else if (isDuplicateEmail(email, employeeId)) {
      document.getElementById("email-error").textContent =
        "Email already exists";
      isValid = false;
    }

    // Validate department
    if (!department) {
      document.getElementById("department-error").textContent =
        "Department is required";
      isValid = false;
    }

    // Validate role
    if (!role) {
      document.getElementById("role-error").textContent = "Role is required";
      isValid = false;
    }

    return isValid;
  }

  /**
   * Checks if email already exists in the system
   * @param {string} email - Email to check
   * @param {string} currentEmployeeId - ID of current employee (for edit mode)
   * @returns {boolean} True if email exists, false otherwise
   */
  function isDuplicateEmail(email, currentEmployeeId) {
    const employees = window.employeeData.getEmployees();
    return employees.some(
      (employee) =>
        employee.email.toLowerCase() === email.toLowerCase() &&
        employee.id.toString() !== currentEmployeeId
    );
  }

  /**
   * Validates email format using regex
   * @param {string} email - Email to validate
   * @returns {boolean} True if email format is valid
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Handles form cancellation with confirmation
   */
  function cancelForm() {
    if (
      confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost."
      )
    ) {
      closeModal();
    }
  }

  /**
   * Closes the modal dialog
   */
  function closeModal() {
    modal.classList.add("hidden");
  }

  /**
   * Displays a temporary notification message
   * @param {string} message - Message to display
   * @param {string} type - Message type (success/error)
   */
  function showNotification(message, type = "success") {
    // Create and append notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Fade out and remove notification after delay
    setTimeout(() => {
      notification.style.transition = "opacity 0.5s ease";
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 500);
    }, 2500);
  }

  /**
   * Helper function to handle operation results
   * @param {boolean|Object} result - Operation result
   * @param {string} operation - Operation type (add/update)
   */
  function handleOperationResult(result, operation) {
    if (result) {
      showNotification(`Employee ${operation}d successfully`);
      closeModal();
      document.dispatchEvent(new CustomEvent("employeeUpdated"));
    } else {
      showNotification(`Failed to ${operation} employee`, "error");
    }
  }
});
