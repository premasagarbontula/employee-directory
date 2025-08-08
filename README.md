Employee Directory System

![Desktop View of App](./images/desktop%20view.png)
![Add Employee View of App](./images/Add%20Employee%20View.png)

A modern web application for managing and browsing employee information with filtering, sorting, and pagination capabilities.

## Features

- **Employee Management**

  - Add/edit/delete employee records
  - Form validation with error handling
  - Persistent data (localStorage)

- **Smart Searching**

  - Live search by name/email
  - Department/Role filters
  - Reset filters button

- **User-Friendly Interface**

  - Clean tabular display
  - Responsive design
  - Pagination controls
  - Interactive action buttons

- **Data Security**
  - Client-side data storage
  - No external dependencies

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with variables
- **Architecture**: Modular JavaScript
- **Persistence**: Browser localStorage

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/premasagarbontula/employee-directory.git

   Open in browser:
   ```

Simply open index.html in any modern browser

No server or dependencies required

##File Structure

```
Project/
│
├── index.html
│
├── scripts/
│   ├── app.js
│   └── employeesData.js
│
└── styles/
    ├── base.css
    ├── components.css
    └── layout.css
```

##Usage Guide
Add Employee: Click "+ Add Employee" button

Search: Type in the search box (name/email)

Filter: Use department/role dropdowns

Edit: Click "Edit" on any employee row

Delete: Click "Delete" (with confirmation)

##Customization
To modify:

Colors: Edit CSS variables in base.css

Sample Data: Update sampleEmployees in employeesData.js

Pagination: Change employeesPerPage in app.js

##Future Enhancements
Export to CSV functionality
Dark mode toggle
Photo upload support
Department/Role management

##License
MIT License - Free for personal and commercial use

Contributors: Prema Sagar Bontula
Live Demo: https://employee-directory-six-sable.vercel.app/
