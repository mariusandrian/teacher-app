# Teacher-app

## About
This app is to allow teachers to do administrative tasks.

## Setup
1. After cloning the repository to local, run below in the project folder to install dependencies:
```
npm install
```
2. There are two SQL files in the sql folder, which are teacher_app and teacher_app_test.
- teacher_app_test.sql creates a test database and is to be run with the test script.
- teacher_app.sql creates the production database and is to be run with `npm run start`

3. Run both sql scripts in MySQL Workbench.

4. Change the user and password as needed in `index.js`
```
const db = mysql.createConnection({
    host: 'localhost',
    user: '<insert user here>',
    password: <insert password here>,
    database: DATABASE
})
```
4. Run `npm run start` to start the production server.
5. Run `npm test` in the folder to run the unit tests.
6. Postman collection is located in the postman folder.