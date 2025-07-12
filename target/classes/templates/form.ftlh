<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formTitle}</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div class="container">
        <h1>${formTitle}</h1>
        <form id="employee-form">
            <input type="hidden" id="employee-id" value="${employee.id?default('')}">
            
            <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" value="${employee.firstName?default('')}" required>
                <div class="error-message" id="first-name-error"></div>
            </div>
            
            <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" value="${employee.lastName?default('')}" required>
                <div class="error-message" id="last-name-error"></div>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" value="${employee.email?default('')}" required>
                <div class="error-message" id="email-error"></div>
            </div>
            
            <div class="form-group">
                <label for="department">Department</label>
                <select id="department" required>
                    <option value="">Select Department</option>
                    <#list departments as dept>
                        <option value="${dept}" 
                            ${(employee.department?default('') == dept?string('selected', '')}>
                            ${dept}
                        </option>
                    </#list>
                </select>
                <div class="error-message" id="department-error"></div>
            </div>
            
            <div class="form-group">
                <label for="role">Role</label>
                <select id="role" required>
                    <option value="">Select Role</option>
                    <#list roles as role>
                        <option value="${role}"
                            ${(employee.role?default('') == role?string('selected', '')}>
                            ${role}
                        </option>
                    </#list>
                </select>
                <div class="error-message" id="role-error"></div>
            </div>
            
            <div class="form-actions">
                <button type="submit" id="save-btn">Save</button>
                <button type="button" id="cancel-btn">Cancel</button>
            </div>
        </form>
    </div>

    <script src="/static/js/data.js"></script>
    <script src="/static/js/form.js"></script>
</body>
</html>