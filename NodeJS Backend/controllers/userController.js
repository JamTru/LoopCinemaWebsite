const db = require("..database");

//Create related Functions
exports.createUser = async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password, {type: argon2.argon2id});
  const user = await db.user.create({
    username = res.body.username,
    passwordHash = hashedPassword,
    email = res.body.email,
    dateOfCreation = res.body.dateOfCreation
  });
  res.json(user);
}

//Read related Functions
exports.findAllUsers = async (req,res) => {
  const users = await db.user.findAll();
  res.json(users);
}

exports.findSingleUser = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);
  res.json(user);
}

exports.loginUser = async (req, res) => {
  // TBD
}

//Update related Functions
exports.updateUser = async (req, res) => {
  const updateResult = await db.user.update({
    //TBD
   },
   {
     where: {
       userame: req.body.username
     }
   });
   res.json(updateResult);
}
//Delete related Functions

exports.deleteUser = async (req, res) => {
  const purgeResult = await db.user.destroy({
    where: {
      username = req.body.username
    }
  })
  res.json(purgeResult);
}
