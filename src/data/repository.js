
const USERS_KEY = "users";
const USER_KEY = "user";

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
      password: "abc123"
    },
    {
      email: "shekhar@gmail.com",
      username: "shekhar",
      password: "def456"
    }
  ];

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

function signupVerify(email, username, password) {
  const users_storage = getUsers(); // get the users fromm localStorage
  let i = 1; // i is used to count to add new account if there is no same username in the array.
  const users = [];
  
  console.log(users_storage)
  for(const user of users_storage) {
    users.push(user)
    
    if(email !== user.email){

      if(users_storage.length === i) {

      
        console.log(users_storage.length === i)
        
        users.push(({email,username,password}))     
        console.log("this is the users data = " + users)
        
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        console.log(users)
        return true;
      
      }
    } 
    i++;
  }
  
  // console.log(users);
  return false;
}


// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(email, password) {
  const users = getUsers();
  for(const user of users) {
    
    if(email === user.email && password === user.password)
    {
      
      setUser(email, user.username);
      return true;
    }
  }

  return false;
}


function setUser(email, username) {
  localStorage.setItem(USER_KEY, JSON.stringify({email, username}));
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  initUsers,
  verifyUser,
  getUser,
  removeUser,
  signupVerify,
}
