
# Loop Cinema Project

Written by Jamie Truong and Daniel Yang

Github Link: https://github.com/rmit-fwp-s2-23/s3888752_s3947728

### Potential Problems
Under the Package.json, we had to add an additional command to the test script using the line ```--transformIgnorePatterns 'node_modules/(?!Assignment 2)/'``` as the tests relied on mocking useNavigate for our modals, and this was the best solution to solve a particular problem. If this causes weird wacky due to missing node_modules as part of submission requirement, it's kinda not our fault?

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
### `npm test`


## Dependencies Installed for Front End

* Axios
* React Bootstrap
* React Dom
* React Router Dom
* React Testing Library

## Dependencies Installed for Back End
* Argon2
* Cors
* Express
* Graphql
* MySQL2
* Sequelize
