import { useState } from "react";
import axios from "axios";

// ---- CONSTANTS -----
const API_HOST = "http://localhost:4000";
const USERS_KEY = "users";
const USER_KEY = "user";


// ------ USER API CALLS ----

async function createNewUser(user){
  const response = await axios.post(API_HOST + "/api/users/create", user)
  return response.data;
}

async function retrieveAllUser() {
  const response = await axios.get(API_HOST + "/api/users");
  const userdata = response.data;
  return userdata;
}

// verifyUser does checking email and password
async function verifyUser(username, password) {
  console.log("IN")
  console.log(username + " " + " > " + password)
  console.log("OUT")
  const response = await axios.get(API_HOST + `/api/users/login/${username}`, { params: { username, password } });
  const user = response.data;
  console.log("test log:" + JSON.stringify(user))
  console.log("7")
  // The login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(user) {
  if (user){
    const response = await axios.get(API_HOST + `/api/users/${user.username}`);
    console.log("response data : " + JSON.stringify(response.data))
    setUser(user)
    return response.data;
  } else {
    return null;
  }
}

async function updateVerify(username, displayUsername, email) {
  const response = await axios.post(API_HOST + `/api/users/profile/${username}`, { displayUsername, email})
  const user = response.data;
  console.log("Test Update : " + JSON.stringify(user))
  return user;
}





// ----- REVIEW API CALLS ----

/**
 * selectAllReviews - Returns all Reviews. This method is currently unused
 *
 * @return {type}  Array of Objects containing all Reviews
 */
async function selectAllReviews(){
    const response = await axios.get(API_HOST + "/api/reviews");
    const allReviewsList = response.data;
    return allReviewsList;
}

/**
 * retrieveAllByMovie - Returns all reviews for a specific movie.
 *
 * @param  {type} movieID The corresponding ID of a given movie is used as the identifier.
 * @return {type}         Array of Objects containing the filtered reviews.
 */
async function retrieveAllByMovie(movieID) {
  const response = await axios.get(API_HOST + `/api/reviews/selectByMovie/${movieID}`);
  const allReviewsByMovie = response.data;
  return allReviewsByMovie;
}

/**
 * retrieveAllByUser - Returns all reviews written by a user.
 *
 * @param  {type} username The foreign key used to identify the foreign key in database
 * @return {type}          Array fo objects containing the filtered reviews
 */
async function retrieveAllByUser(username){
  const response = await axios.get(API_HOST + "/api/reviews/selectByUser", {params: username});
  const allReviewsByUser = response.data;
  return allReviewsByUser
}


/**
 * createNewReview - Creates a new review
 *
 * @param  {type} review A JSON object containing the components of a review stored on database
 * @return {type}        Returns a JSON response containing the new entry on database.
 */
async function createNewReview(review){
  const response = await axios.post(API_HOST + "/api/reviews/create", review);
  return response.data;
}

// --- MOVIE API CALLS -----

/**
 * retrieveDataByMovieID - Returns the information of a given movie with its corresponding ID
 *
 * @param  {type} movieID Int Primary Key for Movie Database
 * @return {type}         Returns Movie Data as JSON
 */

async function retrieveDataByMovieID(movieID) {
  const response = await axios.get(API_HOST + `/api/movies/select/${movieID}`);
  return response.data;
}


// --- RESERVATION API CALLS ------
//
/**
 * checkReservationExists - Queries the DB for if a reservation exists in MovieReserveDB on certain date and movie
 *
 * @param  {type} movieID       Int Primary Key for Movie Database
 * @param  {type} dateOfViewing Date of Reservation
 * @return {type}               Returns empty array if none exist, or a populated array
 */

async function checkReservationExists(movieID, dateOfViewing) {
  const response = await axios.get(API_HOST + `/api/movieReserves/select/${movieID}/${dateOfViewing}`);
  return response.data;
}

/**
 * createNewReservations - Assembles the parameter variables and creates a new entry into movieReserveDB
 *
 * @param  {type} movieID        Int Primary Key for Movie Database
 * @param  {type} movieName      String name of Movie
 * @param  {type} date           Date variable
 * @param  {type} seatsRequested Int number of strings requested by user
 * @param  {type} username       String name of User.
 * @return {type}                Returns array thats populated if successful
 */
async function createNewReservations(movieID, movieName, date, seatsRequested, username){
  const newMovReservation = {
    movieID: movieID,
    movieName: movieName,
    date: date
  }
  const newUserReservation = {
    username: username,
    movieID: movieID,
    movieName: movieName,
    date: date,
    noOfSeats: seatsRequested
  }
  const response = await axios.post(API_HOST + `/api/movieReserves`, newMovReservation);
  return response.data;
}

/**
 * updateExistingReservation - Finds the reservation requested and updates the number of seats available,
 * while also creating a new entry within the userReserves table to track user's reservations.
 *
 * @param  {type} movieID        Int Primary Key for Movie Database
 * @param  {type} movieName      String name of Movie
 * @param  {type} date           Date variable
 * @param  {type} seatsRequested Int number of strings requested by user
 * @param  {type} username       String name of User.
 * @param  {type} reserveID      The PK of the Movie Reserve table
 * @return {type}                Returns array thats populated if successful
 */
async function updateExistingReservation(movieID, movieName, date, seatsRequested, username, reserveID){
  const newUserReservation = {
    username: username.replace(/['"]+/g, ''),
    movieID: movieID,
    movieName: movieName,
    date: date,
    noOfSeats: seatsRequested
  }
  const response = await axios.get(API_HOST + `/api/movieReserves/select/${movieID}/${date}`);
  await axios.put(API_HOST + `/api/movieReserves/update/${reserveID}/${seatsRequested}`);
  const userReserveData = await axios.post(API_HOST + `/api/userReserves`, newUserReservation);
  console.log(userReserveData);
  return userReserveData.data;
}

/**
 * displayRelevantReservations - Retrieves all user's reservations that aren't before the current date.
 *
 * @param  {type} username String name of user
 * @param  {type} today    Date of current day.
 * @return {type}          Returns Array of Reservations.
 */
async function displayRelevantReservations(username, today) {
  const response = await axios.get(API_HOST + `/api/userReserves/select/${username}`);
  return response.data;
}


// ---- TEST ------------


/**
 * testAPICall - Test Method for connecting both backend and front end. Is not intended to be used in production.
 *
 * @return {type}  Array of Movies.
 */
async function testAPICall() {
  const response = await axios.get(API_HOST + "/api/movies");
  const logData = response.data;
  return logData;
}


// ----DEPRECIATED---------------------
// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
    return;

  // User data is hard-coded, passwords are in plain-text.
  const users = [
    {
      email: "mbolger@gmail.com",
      username: "mbolger",
      password: "abc123",
      date: "Thu, 24 Aug 2023"
    },
    {
      email: "shekhar@gmail.com",
      username: "shekhar",
      password: "def456",
      date: "Thu, 24 Aug 2023"
    }
  ];
  // Set data into local storage.
  // localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);
  if (data === undefined) {
    return JSON.parse(null);
  }
  // Convert data to objects.
  return JSON.parse(data);
}

function signupVerify(email, username, password, date) {
  const users_storage = getUsers(); // get the users fromm localStorage
  let i = 1; // i is used to count to add new account if there is no same username in the array.
  const users = [];

  console.log(users_storage)
  for(const user of users_storage) {
    users.push(user)

    if(email !== user.email){
// till last array element if there is no same email address id then it allows user to create another account
      if(users_storage.length === i) {


        console.log(users_storage.length === i)

        users.push(({email,username,password,date}))
        console.log("this is the users data = " + users)

        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        setUser(email, username, date)
        console.log(users)
        return true;

      }
    }
    i++;
  }

  // console.log(users);
  return false;
}

// updateVerify does whenever user edits email or username it updates the status
// function updateVerify(email_old, email, username, password, date) {
//   const users_storage = getUsers(); // get the users fromm localStorage

//   // get the user from db

//   // check if there is any other username is the same

//   // check the value

//   //

//   let i = 1; // i is used to count to add new account if there is no same username in the array.
//   const users = [];

//   // const [password, setPassword] = useState('')

//   console.log(users_storage)
//   for(const user of users_storage) {

//     if(email_old === user.email){

//       console.log("CHECK New email and username : " + email + " " + username + " " + password)
//       users.push(({email, username, password, date}))

//       localStorage.setItem(USERS_KEY, JSON.stringify(users));

//       setUser(email, username, password, date)
//       console.log(JSON.stringify(users))
// // it only generates new review key when there is no review with the same key and deletes previous key
//       if (email_old !== email && localStorage.getItem(email_old) !== false) {
//         localStorage.setItem(email, (localStorage.getItem(email_old)));
//         localStorage.removeItem(email_old)
//       }

//     } else{

//       users.push(user)
//       console.log(i + " - Array LocalStorage");
//     }
//   }
//   i++;

// }

function deleteVerify(email, username, password, date) {
  const users_storage = getUsers(); // get the users fromm localStorage
  let i = 1; // i is used to count to add new account if there is no same username in the array.
  const users = [];
  // const [password, setPassword] = useState('')

  console.log(users_storage)
  for(const user of users_storage) {

    if(email !== user.email){

      console.log("CHECK New email and username : " + user.email + " " + user.username + " " + user.password)
      users.push(user)
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      removeUser();
      console.log(JSON.stringify(users))

    } else{

      console.log(i + " - Array LocalStorage");
    }
  }
  i++;

}


// --- Helper functions to interact with local storage ---

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user.username));
}

function getUser() {
  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).username;
  }
  return localStorage.getItem(null);
}

function getPassword() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function getEmail() {
  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).email;
  }
  return localStorage.getItem(USER_KEY);
}
function getDate() {
  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).date;
  }
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

function addReview(rating, comment, dateOfCreation, movieName) {
  /*Function for handling the creation of a review object and pushing it to the local storage.*/
  const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem(user.email) != null) { //If statement handles whether or not the user has a preexisting array, if not creates one.
    const review = {
      name: movieName,
      numRate: rating,
      commentString: comment,
      date: dateOfCreation
    }
    const reviewsList = JSON.parse(localStorage.getItem(user.email));
    reviewsList.push(review);
    localStorage.setItem(user.email, JSON.stringify(reviewsList));
  } else {
    const reviewsList = [];
    const review = {
      name: movieName,
      numRate: rating,
      commentString: comment,
      date: dateOfCreation
    }
    reviewsList.push(review);
    localStorage.setItem(user.email, JSON.stringify(reviewsList));
  }
}


export {
  createNewUser,
  initUsers,
  verifyUser,
  getUser,
  getEmail,
  getPassword,
  getDate,
  removeUser,
  signupVerify,
  updateVerify,
  deleteVerify,
  addReview,
  testAPICall,
  retrieveDataByMovieID,
  createNewReview,
  retrieveAllByMovie,
  createNewReservations,
  updateExistingReservation,
  displayRelevantReservations,
  checkReservationExists,
  findUser
}
