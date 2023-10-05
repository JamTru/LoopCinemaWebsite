const db = require("../database");
const argon2 = require("argon2");


//Create related Functions
exports.createUser = async (req, res) => {
  console.log("REQUEST DATA")
  console.log(req.body)
  const hashedPassword = await argon2.hash(req.body.password, {type: argon2.argon2id});
  
  const user = await db.users.create({
    username: req.body.username,
    passwordHash: hashedPassword,
    email: req.body.email,
    dateOfCreation: req.body.dateOfCreation
  });
  res.json(user);
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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await db.users.findOne({ where: { email: email } });
  
  if (!user) {
    return res.status(404).send('User not found');
  }

  const isPasswordValid = await argon2.verify(user.passwordHash, password);

  if (!isPasswordValid) {
    return res.status(401).send('Invalid password');
  }

  res.json({ success: true, message: "Logged in successfully" });
}

//Update related Functions
exports.updateUser = async (req, res) => {
  const username = req.params.username;



  // const updateResult = await db.user.update({
  //   //TBD
  //  },
  //  {
  //    where: {
  //      userame: req.body.username
  //    }
  //  });
  //  res.json(updateResult);
}


//Delete related Functions

exports.deleteUser = async (req, res) => {
  const purgeResult = await db.user.destroy({
    where: {
      username: req.body.username
    }
  })
  res.json(purgeResult);
}
