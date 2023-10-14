const db = require("../database");
const argon2 = require("argon2");


//Create related Functions
exports.createUser = async (req, res) => {
  console.log("REQUEST DATA")
  console.log(req.body)
  const hashedPassword = await argon2.hash(req.body.password, {type: argon2.argon2id});
  
  const user = await db.users.create({
    username: req.body.username,
    displayName: req.body.username,
    passwordHash: hashedPassword,
    email: req.body.email,
    dateOfCreation: req.body.dateOfCreation
  });
  res.json(user);
}

// Select one user for the database if username and password are a match.
exports.loginUser = async (req, res) => {
  const user = await db.users.findByPk(req.params.username);
  console.log("Request!! >> " + req.query.username + " : " + req.query.password)

  if(user == null || await argon2.verify(user.passwordHash, req.query.password) == false){
    // Login fail
    res.json(null)
  } else {
    res.json(user)
  }
  
}

//Read All Users
exports.findAllUsers = async (req,res) => {
  const users = await db.users.findAll();
  res.json(users);
}

// Select one user from the database.
exports.findSingleUser = async (req, res) => {
  const user = await db.users.findByPk(req.params.username);
  res.json(user);
}

//Update related Functions
exports.updateUser = async (req, res) => {
  const user = await db.users.findByPk(req.params.old_username);
  console.log(req.body)

  if (user) {
    await user.update({ email: req.body.email });
    await user.save();
    res.json(user);  
    
  } else {
    res.json("Empty user")
  }
   
}


//Delete related Functions

exports.deleteUser = async (req, res) => {
  const purgeResult = await db.users.destroy({
    where: {
      username: req.body.username
    }
  })
  res.json(purgeResult);
}
