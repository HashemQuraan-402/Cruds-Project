# Product Management CRUD Application

A browser-based product management application built with vanilla JavaScript. It supports the complete CRUD workflow and stores data locally in the browser, making it a lightweight demonstration of DOM manipulation, validation, and client-side persistence.

## Live Demo

[View the live project](https://hashemquraan-402.github.io/product-management-crud-app/)

## Features

- Create one or multiple product records
- Calculate the final price from price, taxes, advertising cost, and discount
- Validate product data before saving
- Read and display products in a table
- Update and delete individual products
- Delete all application records without clearing unrelated browser data
- Search by product title or category
- Persist records with `localStorage`

## Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- Web Storage API

## Run Locally

No installation or build step is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/HashemQuraan-402/product-management-crud-app.git
   ```

2. Open the cloned folder.
3. Open `index.html` in a modern browser. For the best development experience, use the Live Server extension in Visual Studio Code.

## How to Use

1. Enter the product title, price information, count, and category.
2. Select **Create** to save the record or records.
3. Use **Update** or **Delete** from the product table.
4. Select a search mode and enter a title or category.

## Data Storage

The application stores product records only in the current browser through `localStorage`. It does not use a server or external database. Clearing the site's browser storage removes the saved records.

## Project Structure

```text
product-management-crud-app/
├── index.html
├── main.js
├── style.css
├── .gitignore
└── README.md
```

## Current Scope

This is a client-side educational project. Authentication, a back-end API, multi-user synchronization, and automated tests are outside its current scope.

## Future Improvements

- Add automated unit and end-to-end tests
- Improve accessibility and form feedback
- Split the JavaScript into smaller modules
- Add a back-end API and database

## Author

**Hashem Quraan**

- [GitHub](https://github.com/HashemQuraan-402)
- [LinkedIn](https://www.linkedin.com/in/hashem-quraan-b561453ab)
