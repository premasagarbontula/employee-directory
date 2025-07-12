<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/layout.css">
    <link rel="stylesheet" href="/static/css/components.css">
</head>
<body>
    <div class="container">
        <header class="app-header">
            <div class="logo-container">
                <img src="https://media.istockphoto.com/id/1165660282/vector/contact-book.jpg?s=612x612&w=0&k=20&c=vtzVSsr3mbq-0rOvEKBz69c_JZCCw4U04XVFnFwqecY=" class="app-logo" alt="employee directory logo"/>
                <h1>Employee Directory</h1>
            </div>
            <div class="app-controls">
                <div class="search-container">
                    <input type="text" id="search-input" placeholder="Search by name or email">
                    <button id="filter-btn" class="btn btn-secondary">Filters</button>
                    <button id="add-employee-btn" class="btn btn-primary">Add Employee</button>
                </div>
            </div>
        </header>

        <div class="filter-panel hidden" id="filter-panel">
            <h3>Filter Employees</h3>
            <div class="filter-group">
                <label for="first-name-filter">First Name</label>
                <input type="text" id="first-name-filter">
            </div>
            <div class="filter-group">
                <label for="department-filter">Department</label>
                <select id="department-filter">
                    <option value="">All Departments</option>
                    <#list departments as dept>
                        <option value="${dept}">${dept}</option>
                    </#list>
                </select>
            </div>
            <div class="filter-group">
                <label for="role-filter">Role</label>
                <select id="role-filter">
                    <option value="">All Roles</option>
                    <#list roles as role>
                        <option value="${role}">${role}</option>
                    </#list>
                </select>
            </div>
            <div class="filter-actions">
                <button id="apply-filters" class="btn btn-primary">Apply</button>
                <button id="reset-filters" class="btn btn-secondary">Reset</button>
            </div>
        </div>

        <div class="sort-controls">
            <div class="sort-group">
                <label for="sort-field">Sort by:</label>
                <select id="sort-field">
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="department">Department</option>
                </select>
            </div>
            <div class="sort-group">
                <label for="sort-direction">Sort Alphabetically:</label>
                <select id="sort-direction">
                    <option value="asc">A to Z (Ascending)</option>
                    <option value="desc">Z to A (Descending)</option>
                </select>
            </div>
            <div class="sort-group">
                <label for="page-size">Items</label>
                <select id="page-size">
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select><label for="page-size">per page</label>
            </div>
        </div>

        <main class="employee-list-container">
            <#list employees as employee>
                <div class="employee-card" data-id="${employee.id}">
                    <div class="employee-info">
                        <h3>${employee.firstName} ${employee.lastName}</h3>
                        <p><strong>Email:</strong> ${employee.email}</p>
                        <p><strong>Department:</strong> ${employee.department}</p>
                        <p><strong>Role:</strong> ${employee.role}</p>
                    </div>
                    <div class="employee-actions">
                        <button class="btn btn-edit edit-btn" data-id="${employee.id}">Edit</button>
                        <button class="btn btn-delete delete-btn" data-id="${employee.id}">Delete</button>
                    </div>
                </div>
            </#list>
        </main>

        <div class="pagination">
            <button id="prev-page" class="btn btn-secondary" disabled>Previous</button>
            <span id="page-info">Page 1 of 1</span>
            <button id="next-page" class="btn btn-secondary" disabled>Next</button>
        </div>

        <div id="employee-form-modal" class="modal hidden">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2 id="form-title">Add Employee</h2>
                <form id="employee-form">
                    <input type="hidden" id="employee-id">
                    <div class="form-group">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" required>
                        <div class="error-message" id="first-name-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" required>
                        <div class="error-message" id="last-name-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                        <div class="error-message" id="email-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="department">Department</label>
                        <select id="department" required>
                            <option value="">Select Department</option>
                            <#list departments as dept>
                                <option value="${dept}">${dept}</option>
                            </#list>
                        </select>
                        <div class="error-message" id="department-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="role">Role</label>
                        <select id="role" required>
                            <option value="">Select Role</option>
                            <#list roles as role>
                                <option value="${role}">${role}</option>
                            </#list>
                        </select>
                        <div class="error-message" id="role-error"></div>
                    </div>
                    <div class="form-actions">
                        <button type="button" id="cancel-form" class="btn btn-secondary">Cancel</button>
                        <button type="submit" id="save-employee" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <footer class="app-footer">
        <p>© 2025 Employee Directory App. All rights reserved.</p>
    </footer>

    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
    <script src="/static/js/form.js"></script>
</body>
</html>