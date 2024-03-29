const { json } = require("sequelize");
const db = require("../database");
const argon2 = require("argon2");


//Create related Functions
exports.createUser = async (req, res) => {

  const hashedPassword = await argon2.hash(req.body.password, {type: argon2.argon2id});

  const user = await db.users.create({
    username: req.body.username,
    displayUsername: req.body.username,
    passwordHash: hashedPassword,
    email: req.body.email,
    dateOfCreation: req.body.dateOfCreation
  });
  res.json(user);
}

// Select one user for the database if username and password are a match.
exports.loginUser = async (req, res) => {
  // check the primary key exists
  const user = await db.users.findAll({
    where: {
      displayUsername: req.query.displayUsername
    }
  })


  if (user.length === 0) {
    // No other user with the same 'displayUsername'
    res.json(null)
  } else {
    // At least one user with the same 'displayUsername' exists

    // Verify the password for the first matching user
    if (await argon2.verify(user[0].passwordHash, req.query.password)) {
      // Password is correct
      res.json(user[0]);
    } else {
      // Password is incorrect
      res.json(null);
    }
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
  const user = await db.users.findByPk(req.params.username);

  if (user) {
    await user.update({
      displayUsername: req.body.displayUsername,
      email: req.body.email
    });
    await user.save();

    res.json(user);

  } else {
    res.json(null)
  }


}


//Delete related Functions
exports.deleteUser = async (req, res) => {
  const userDeletion = await db.users.destroy({
    where: {
      displayUsername: req.params.displayUsername
    }
  });
  res.json(userDeletion);
}
