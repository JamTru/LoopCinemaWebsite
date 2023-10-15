import { useState } from "react";
import axios from "axios";

// ---- CONSTANTS -----
const API_HOST = "http://localhost:4000";
const USERS_KEY = "users";
const USER_KEY = "user";


// ------ USER API CALLS ----

async function createNewUser(user){
  const response = await axios.post(API_HOST + "/api/users/create", user)
  console.log("response data : " + JSON.stringify(response.data))
  user = response.data;
  setUser(user)
  return response.data;
}

async function retrieveAllUser() {
  const response = await axios.get(API_HOST + "/api/users");
  const userdata = response.data;
  return userdata;
}

// verifyUser does checking email and password
async function verifyUser(displayUsername, password) {
  console.log("IN")
  console.log(displayUsername + " " + " > " + password)
  console.log("OUT")
  const response = await axios.get(API_HOST + `/api/users/login/${displayUsername}`, { params :{ displayUsername, password }} );
  const user = response.data;
  console.log("test log:" + JSON.stringify(user))
  console.log("7")
  // The login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function signupVerify(user){
  const response = await axios.get(API_HOST + `/api/users/${user.username}`);
  console.log("signupVerify : " + JSON.stringify(response.data))
  // When username exists, return the actual data
  if(response.data != null) {
    return "User exists"
  }
  return null
}

async function findUser(user) {
  if (user){
    const response = await axios.get(API_HOST + `/api/users/${user.username}`);

    return response.data;
  } else {
    return null;
  }
}

async function updateVerify(username, displayUsername, email) {
  const response = await axios.post(API_HOST + `/api/users/profile/${username}`, { displayUsername, email})
  const user = response.data;
  console.log("Test Update : " + JSON.stringify(user))
  setUser(user)
  return user;
}


async function deleteVerify(username, displayUsername, email) {
  console.log(username + " dis : " + displayUsername + " : " + email)
  const response = await axios.post(API_HOST + `/api/users/delete/${displayUsername}`, {username, email})
  return response.data;
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
    username: username,
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




// --- Helper functions to interact with local storage ---

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  if (localStorage.getItem(USER_KEY) != null){
    console.log("READING GetUser : " + JSON.parse(localStorage.getItem(USER_KEY)));
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
  console.log("only when localStorage is null or undefined")
  return localStorage.getItem(null);
}

function getUsername() {
  if (localStorage.getItem(USER_KEY) != null){
    console.log("READING GetUsername : " + JSON.parse(localStorage.getItem(USER_KEY)).username);
    return JSON.parse(localStorage.getItem(USER_KEY)).username;
  }
  return localStorage.getItem(null);
}

function getDisplayUsername() {
  if (localStorage.getItem(USER_KEY) != null){
    console.log("DisPlayUsername : " + JSON.parse(localStorage.getItem(USER_KEY)).displayUsername);
    return JSON.parse(localStorage.getItem(USER_KEY)).displayUsername;
  }
  return localStorage.getItem(null);
}

function getPassword() {
  if (localStorage.getItem(USER_KEY) != null){
    return JSON.parse(localStorage.getItem(USER_KEY)).password;
  }
  return localStorage.getItem(null);
}

function getEmail() {
  if (localStorage.getItem(USER_KEY) != null){
    return JSON.parse(localStorage.getItem(USER_KEY)).email;
  }
  return localStorage.getItem(null);
}
function getDate() {
  if (localStorage.getItem(USER_KEY) != null){
    return JSON.parse(localStorage.getItem(USER_KEY)).createdTimeStamp;
  }
  return localStorage.getItem(null);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}


// ------------------- Review ------------------------

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
  getUsername,
  getDisplayUsername,
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
