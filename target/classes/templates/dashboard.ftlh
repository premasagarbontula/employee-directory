<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Employee Directory</h1>
            <div class="controls">
                <input type="text" id="search" placeholder="Search employees...">
                <button id="add-employee">Add Employee</button>
                <button id="filter-toggle">Filters</button>
            </div>
            
            <div id="filter-panel" class="hidden">
                <select id="department-filter">
                    <option value="">All Departments</option>
                    <#list departments as dept>
                        <option value="${dept}">${dept}</option>
                    </#list>
                </select>
                <select id="role-filter">
                    <option value="">All Roles</option>
                    <#list roles as role>
                        <option value="${role}">${role}</option>
                    </#list>
                </select>
                <button id="apply-filters">Apply</button>
                <button id="clear-filters">Clear</button>
            </div>
        </header>

        <div class="sort-controls">
            <span>Sort by:</span>
            <select id="sort-field">
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="department">Department</option>
            </select>
            <select id="sort-direction">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>

        <div id="employee-list">
            <#list employees as employee>
                <div class="employee-card" data-id="${employee.id}">
                    <div class="employee-info">
                        <h3>${employee.firstName} ${employee.lastName}</h3>
                        <p><strong>ID:</strong> ${employee.id}</p>
                        <p><strong>Email:</strong> ${employee.email}</p>
                        <p><strong>Department:</strong> ${employee.department}</p>
                        <p><strong>Role:</strong> ${employee.role}</p>
                    </div>
                    <div class="employee-actions">
                        <button class="edit-btn" data-id="${employee.id}">Edit</button>
                        <button class="delete-btn" data-id="${employee.id}">Delete</button>
                    </div>
                </div>
            </#list>
        </div>

        <div class="pagination">
            <button id="prev-page" disabled>Previous</button>
            <span id="page-info">Page 1 of 1</span>
            <button id="next-page" disabled>Next</button>
            <select id="page-size">
                <option value="5">5 per page</option>
                <option value="10" selected>10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
            </select>
        </div>
    </div>

    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>